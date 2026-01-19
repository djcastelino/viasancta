/**
 * Source Link Utility
 *
 * Converts text source citations into URLs for Catholic scholarly resources
 */

export interface LinkedSource {
  text: string;
  url: string | null;
  type: 'CCC' | 'ChurchFather' | 'PapalDoc' | 'Scholar' | 'Bible' | 'Website' | 'Other';
}

/**
 * Convert a source citation to a URL
 */
export function getSourceLink(source: string): LinkedSource {
  const text = source;

  // CCC - Catechism of the Catholic Church
  if (source.startsWith('CCC ')) {
    const match = source.match(/CCC\s+(\d+(-\d+)?)/);
    if (match) {
      const section = match[1].split('-')[0]; // Get first number
      return {
        text,
        url: `https://www.usccb.org/sites/default/files/flipbooks/catechism/${section}`,
        type: 'CCC'
      };
    }
  }

  // Church Fathers and Aquinas
  if (source.match(/Irenaeus|Origen|Chrysostom|Ambrose|Jerome|Cyril|Gregory|Basil|Athanasius|Clement|Tertullian|Justin Martyr|Melito|Leo the Great|Hippolytus/i)) {
    // Check for specific works
    if (source.includes('Against Heresies')) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/0103.htm',
        type: 'ChurchFather'
      };
    }
    if (source.includes('Homilies')) {
      const author = source.match(/^([^,]+),/)?.[1] || '';
      const searchQuery = encodeURIComponent(author + ' homilies');
      return {
        text,
        url: `https://www.newadvent.org/fathers/`,
        type: 'ChurchFather'
      };
    }
    if (source.includes('Tractates') || source.includes('Confessions') || source.includes('City of God')) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/1101.htm',
        type: 'ChurchFather'
      };
    }
    if (source.includes('Catechetical Lectures')) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/3101.htm',
        type: 'ChurchFather'
      };
    }
    // Generic Church Fathers link
    return {
      text,
      url: 'https://www.newadvent.org/fathers/',
      type: 'ChurchFather'
    };
  }

  // Thomas Aquinas - Summa Theologica
  if (source.match(/Aquinas|ST\s+(I|II|III)/)) {
    const match = source.match(/ST\s+(I+|I-II|II-II|III|Suppl\.?),?\s+q\.\s*(\d+)/);
    if (match) {
      const part = match[1];
      const question = match[2];
      // Map to New Advent URLs
      let partCode = 'FP'; // First Part
      if (part === 'I-II') partCode = 'FS'; // First Part of Second Part
      else if (part === 'II-II') partCode = 'SS'; // Second Part of Second Part
      else if (part === 'III') partCode = 'TP'; // Third Part
      else if (part.includes('Suppl')) partCode = 'XP'; // Supplement

      return {
        text,
        url: `https://www.newadvent.org/summa/${partCode}${question.padStart(3, '0')}.htm`,
        type: 'ChurchFather'
      };
    }
    // Generic Aquinas link
    return {
      text,
      url: 'https://www.newadvent.org/summa/',
      type: 'ChurchFather'
    };
  }

  // Augustine specifically
  if (source.match(/Augustine/)) {
    if (source.includes('Confessions')) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/1101.htm',
        type: 'ChurchFather'
      };
    }
    if (source.includes('City of God')) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/1201.htm',
        type: 'ChurchFather'
      };
    }
    if (source.includes('On Baptism')) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/14092.htm',
        type: 'ChurchFather'
      };
    }
    // Generic Augustine
    return {
      text,
      url: 'https://www.newadvent.org/fathers/1101.htm',
      type: 'ChurchFather'
    };
  }

  // Papal Documents
  if (source.match(/John Paul II|Benedict XVI|Paul VI|Pius XII|Leo XIII/)) {
    // Specific encyclicals and documents
    if (source.includes('Redemptoris Mater')) {
      return {
        text,
        url: 'https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html',
        type: 'PapalDoc'
      };
    }
    if (source.includes('Ecclesia de Eucharistia')) {
      return {
        text,
        url: 'https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_20030417_eccl-de-euch.html',
        type: 'PapalDoc'
      };
    }
    if (source.includes('Jesus of Nazareth')) {
      return {
        text,
        url: 'https://www.vatican.va/content/benedict-xvi/en.html',
        type: 'PapalDoc'
      };
    }
    if (source.includes('Pastores Dabo Vobis')) {
      return {
        text,
        url: 'https://www.vatican.va/content/john-paul-ii/en/apost_exhortations/documents/hf_jp-ii_exh_25031992_pastores-dabo-vobis.html',
        type: 'PapalDoc'
      };
    }
    // Generic Vatican link
    return {
      text,
      url: 'https://www.vatican.va/',
      type: 'PapalDoc'
    };
  }

  // Modern Catholic Scholars
  if (source.match(/Scott Hahn|Brant Pitre|Matthew Levering/)) {
    // Link to their main works or author pages
    if (source.includes('Scott Hahn')) {
      return {
        text,
        url: 'https://www.scotthahn.com/',
        type: 'Scholar'
      };
    }
    if (source.includes('Brant Pitre')) {
      return {
        text,
        url: 'https://www.brantpitre.com/',
        type: 'Scholar'
      };
    }
    // Generic
    return {
      text,
      url: null,
      type: 'Scholar'
    };
  }

  // Bible References
  if (source.match(/^(Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation)\s+\d+/)) {
    const match = source.match(/^([A-Za-z\s]+)\s+(\d+):(\d+(-\d+)?)/);
    if (match) {
      const book = match[1].trim();
      const chapter = match[2];
      const verse = match[3];
      const reference = `${book} ${chapter}:${verse}`;
      return {
        text,
        url: `https://bible.usccb.org/bible/${book.toLowerCase().replace(/\s+/g, '')}/${chapter}`,
        type: 'Bible'
      };
    }
  }

  // Websites
  if (source.includes('miracolieucaristici.org')) {
    return {
      text,
      url: 'https://www.miracolieucaristici.org/',
      type: 'Website'
    };
  }

  if (source.match(/\.org|\.com|http/)) {
    // Try to extract URL
    const urlMatch = source.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      return {
        text,
        url: urlMatch[1],
        type: 'Website'
      };
    }
    // If it's just a domain name
    if (source.match(/^[\w\-]+\.(org|com|edu)/)) {
      return {
        text,
        url: `https://${source.split(/\s/)[0]}`,
        type: 'Website'
      };
    }
  }

  // Vatican II Documents
  if (source.match(/Lumen Gentium|Sacrosanctum Concilium|Dei Verbum|Gaudium et Spes/)) {
    if (source.includes('Lumen Gentium')) {
      return {
        text,
        url: 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_en.html',
        type: 'PapalDoc'
      };
    }
    if (source.includes('Sacrosanctum Concilium')) {
      return {
        text,
        url: 'https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19631204_sacrosanctum-concilium_en.html',
        type: 'PapalDoc'
      };
    }
  }

  // Other - no link available
  return {
    text,
    url: null,
    type: 'Other'
  };
}

/**
 * Convert array of sources to linked sources
 */
export function linkSources(sources: string[]): LinkedSource[] {
  return sources.map(source => getSourceLink(source));
}
