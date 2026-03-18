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
 * Convert Roman numerals to Arabic numbers
 */
function romanToArabic(roman: string): number | null {
  const romanMap: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };

  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];

    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }

  return result || null;
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
      const paragraphNumber = match[1].split('-')[0]; // Get first number
      // Use St. Charles Borromeo Parish CCC (direct paragraph links)
      return {
        text,
        url: `http://www.scborromeo.org/ccc/para/${paragraphNumber}.htm`,
        type: 'CCC'
      };
    }
  }

  // Church Fathers and Aquinas (NOTE: Gregory handled separately below, not in this generic check)
  if (source.match(/Irenaeus|Origen|Chrysostom|Ambrose|Jerome|Cyril|Basil|Athanasius|Clement|Tertullian|Justin Martyr|Melito|Leo the Great|Hippolytus/i)) {
    // Jerome - most commentaries not available on NewAdvent
    if (source.match(/Jerome/i)) {
      // Only Letters, Against Jovinianus, Against Vigilantius, Against Pelagians, Lives, Prefaces available
      if (source.includes('Letters') || source.includes('Letter')) {
        return {
          text,
          url: 'https://www.newadvent.org/fathers/3001.htm',
          type: 'ChurchFather'
        };
      }
      if (source.includes('Perpetual Virginity')) {
        return {
          text,
          url: 'https://www.newadvent.org/fathers/3007.htm',
          type: 'ChurchFather'
        };
      }
      // Commentary on Jeremiah, Ezekiel, Isaiah, etc. NOT available on NewAdvent
      // Return null to show as non-linked text
      if (source.includes('Commentary')) {
        return {
          text: text + ' (not available online)',
          url: null,
          type: 'ChurchFather'
        };
      }
    }

    // Irenaeus - Against Heresies with book/chapter
    if (source.includes('Against Heresies')) {
      // Match format like "Against Heresies III.22.4" or "3.22.4"
      const bookMatch = source.match(/Against Heresies\s+([IVX]+|[0-9])\.(\d+)\.?(\d+)?/i);
      if (bookMatch) {
        let bookNum;
        if (bookMatch[1].match(/[IVX]/i)) {
          bookNum = romanToArabic(bookMatch[1]);
        } else {
          bookNum = parseInt(bookMatch[1]);
        }

        if (bookNum && bookNum >= 1 && bookNum <= 5) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/0103${bookNum}${bookMatch[2].padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      // Generic Against Heresies
      return {
        text,
        url: 'https://www.newadvent.org/fathers/0103.htm',
        type: 'ChurchFather'
      };
    }
    if (source.includes('Homilies')) {
      // Unknown homilies - don't link to generic page
      return {
        text: text + ' (reference only)',
        url: null,
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
    // Generic Church Fathers - no specific link available
    return {
      text: text + ' (reference only)',
      url: null,
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
    // Generic Aquinas - don't link to Summa home page
    return {
      text: text + ' (reference only)',
      url: null,
      type: 'ChurchFather'
    };
  }

  // Augustine specifically
  if (source.match(/Augustine/)) {
    // City of God with book number (e.g., "City of God XVII.16")
    if (source.includes('City of God')) {
      const bookMatch = source.match(/City of God\s+([IVX]+)/);
      if (bookMatch) {
        const romanBook = bookMatch[1];
        const bookNum = romanToArabic(romanBook);
        if (bookNum && bookNum >= 1 && bookNum <= 22) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/1201${bookNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      // Generic City of God (Book 1)
      return {
        text,
        url: 'https://www.newadvent.org/fathers/120101.htm',
        type: 'ChurchFather'
      };
    }

    // Confessions with book number
    if (source.includes('Confessions')) {
      const bookMatch = source.match(/Confessions\s+([IVX]+)/);
      if (bookMatch) {
        const romanBook = bookMatch[1];
        const bookNum = romanToArabic(romanBook);
        if (bookNum && bookNum >= 1 && bookNum <= 13) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/1101${bookNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      // Generic Confessions (Book 1)
      return {
        text,
        url: 'https://www.newadvent.org/fathers/110101.htm',
        type: 'ChurchFather'
      };
    }

    // Tractates on John (e.g., "Tractates on John 7.23" or "Tractates on John 119")
    if (source.match(/Tractates on John/i)) {
      // Match integer or decimal format (7.23 → extract "7") or range (46-47 → extract "46")
      const tractateMatch = source.match(/Tractates on John\s+(\d+)(?:[\.\-]\d+)?/i);
      if (tractateMatch) {
        const tractateNum = parseInt(tractateMatch[1]);
        if (tractateNum >= 1 && tractateNum <= 124) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/1701${tractateNum.toString().padStart(3, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      // Generic Tractates
      return {
        text,
        url: 'https://www.newadvent.org/fathers/1701001.htm',
        type: 'ChurchFather'
      };
    }

    // Against Faustus (e.g., "Against Faustus XII.41")
    if (source.match(/Against Faustus/i)) {
      const bookMatch = source.match(/Against Faustus\s+([IVX]+)/i);
      if (bookMatch) {
        const romanBook = bookMatch[1];
        const bookNum = romanToArabic(romanBook);
        if (bookNum && bookNum >= 1 && bookNum <= 33) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/1406.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/1406.htm',
        type: 'ChurchFather'
      };
    }

    // Letters (e.g., "Letter 102.6-8")
    if (source.match(/Letter\s+\d+/i)) {
      const letterMatch = source.match(/Letter\s+(\d+)/i);
      if (letterMatch) {
        const letterNum = parseInt(letterMatch[1]);
        if (letterNum >= 1 && letterNum <= 270) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/1102${letterNum.toString().padStart(3, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/1102001.htm',
        type: 'ChurchFather'
      };
    }

    // Expositions on Psalms (e.g., "Expositions on Psalms 23")
    if (source.match(/Expositions on (the )?Psalms?/i)) {
      const psalmMatch = source.match(/Expositions on (?:the )?Psalms?\s+(\d+)/i);
      if (psalmMatch) {
        const psalmNum = parseInt(psalmMatch[1]);
        if (psalmNum >= 1 && psalmNum <= 150) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/1801${psalmNum.toString().padStart(3, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/180101.htm',
        type: 'ChurchFather'
      };
    }

    // Sermons
    if (source.includes('Sermons') || source.includes('Sermon')) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/160301.htm',
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

    // Generic Augustine - don't default to wrong work
    return {
      text: text + ' (reference only)',
      url: null,
      type: 'ChurchFather'
    };
  }

  // Chrysostom (John Chrysostom)
  if (source.match(/Chrysostom/)) {
    // Homilies on Matthew
    if (source.match(/Homilies on Matthew/i)) {
      const homMatch = source.match(/Homilies on Matthew\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        if (homNum >= 1 && homNum <= 90) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/2001${homNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/200101.htm',
        type: 'ChurchFather'
      };
    }

    // Homilies on John
    if (source.match(/Homilies on (the Gospel of )?John/i)) {
      const homMatch = source.match(/Homilies on (?:the Gospel of )?John\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        if (homNum >= 1 && homNum <= 88) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/2401${homNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/240101.htm',
        type: 'ChurchFather'
      };
    }

    // Homilies on Romans
    if (source.match(/Homilies on Romans/i)) {
      const homMatch = source.match(/Homilies on Romans\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        if (homNum >= 1 && homNum <= 32) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/2102${homNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/210201.htm',
        type: 'ChurchFather'
      };
    }

    // Homilies on Acts
    if (source.match(/Homilies on Acts/i)) {
      const homMatch = source.match(/Homilies on Acts\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        if (homNum >= 1 && homNum <= 55) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/2101${homNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/210101.htm',
        type: 'ChurchFather'
      };
    }

    // Homilies on 1 Corinthians
    if (source.match(/Homilies on (1|First|I) Corinthians/i)) {
      const homMatch = source.match(/Homilies on (?:1|First|I) Corinthians\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        if (homNum >= 1 && homNum <= 44) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/2201${homNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/220101.htm',
        type: 'ChurchFather'
      };
    }

    // Homilies on 2 Corinthians
    if (source.match(/Homilies on (2|Second|II) Corinthians/i)) {
      const homMatch = source.match(/Homilies on (?:2|Second|II) Corinthians\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        if (homNum >= 1 && homNum <= 30) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/2301${homNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/230101.htm',
        type: 'ChurchFather'
      };
    }

    // Homilies on Galatians
    if (source.match(/Homilies on Galatians/i)) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/230201.htm',
        type: 'ChurchFather'
      };
    }

    // Homilies on Ephesians
    if (source.match(/Homilies on Ephesians/i)) {
      const homMatch = source.match(/Homilies on Ephesians\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        if (homNum >= 1 && homNum <= 24) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/2303${homNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/230301.htm',
        type: 'ChurchFather'
      };
    }

    // Homilies on Hebrews
    if (source.match(/Homilies on Hebrews/i)) {
      const homMatch = source.match(/Homilies on Hebrews\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        if (homNum >= 1 && homNum <= 34) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/2402${homNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/240201.htm',
        type: 'ChurchFather'
      };
    }

    // Unknown Chrysostom work - don't link to wrong page
    return {
      text: text + ' (reference only)',
      url: null,
      type: 'ChurchFather'
    };
  }

  // Gregory of Nazianzus (MUST come before other Gregory checks)
  if (source.match(/Gregory of Nazianzus|Gregory Nazianzen/i)) {
    // Orations are available on New Advent
    if (source.match(/Oration/i)) {
      const orationMatch = source.match(/Oration(?:s)?\s+(\d+)/i);
      if (orationMatch) {
        const orationNum = parseInt(orationMatch[1]);
        if (orationNum >= 1 && orationNum <= 45) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/3103${orationNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      // Generic Orations link
      return {
        text,
        url: 'https://www.newadvent.org/fathers/310301.htm',
        type: 'ChurchFather'
      };
    }
    // Other Gregory of Nazianzus works
    return {
      text: text + ' (reference only)',
      url: null,
      type: 'ChurchFather'
    };
  }

  // Gregory of Nyssa (MUST come before Gregory the Great check)
  if (source.match(/Gregory of Nyssa/i)) {
    // Life of Moses - not available on NewAdvent
    if (source.match(/Life of Moses/i)) {
      return {
        text: text + ' (not available online)',
        url: null,
        type: 'ChurchFather'
      };
    }
    // Other Gregory of Nyssa works - mark as unavailable for now
    return {
      text: text + ' (not available online)',
      url: null,
      type: 'ChurchFather'
    };
  }

  // Gregory the Great
  if (source.match(/Gregory the Great|Pope Gregory I/i)) {
    // Morals on Job - not fully available on NewAdvent
    if (source.match(/Morals on Job/i)) {
      return {
        text: text + ' (not available online)',
        url: null,
        type: 'ChurchFather'
      };
    }
    // Moralia on Job (alternate title)
    if (source.match(/Moralia/i)) {
      return {
        text: text + ' (not available online)',
        url: null,
        type: 'ChurchFather'
      };
    }
    // Pastoral Care / Pastoral Rule - link directly to Book 1
    if (source.match(/Pastoral (Care|Rule)/i)) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/36011.htm',
        type: 'ChurchFather'
      };
    }
    // Dialogues - not available on NewAdvent
    if (source.match(/Dialogues/i)) {
      return {
        text: text + ' (not available online)',
        url: null,
        type: 'ChurchFather'
      };
    }
    // Generic Gregory the Great - link to Pastoral Rule Book 1
    return {
      text,
      url: 'https://www.newadvent.org/fathers/36011.htm',
      type: 'ChurchFather'
    };
  }

  // Leo the Great
  if (source.match(/Leo the Great|Pope Leo I/i)) {
    // Sermons
    if (source.match(/Sermon/i)) {
      const sermMatch = source.match(/Sermon(?:s)?\s+(\d+)/i);
      if (sermMatch) {
        const sermNum = parseInt(sermMatch[1]);
        if (sermNum >= 1 && sermNum <= 96) {
          return {
            text,
            url: `https://www.newadvent.org/fathers/3602${sermNum.toString().padStart(2, '0')}.htm`,
            type: 'ChurchFather'
          };
        }
      }
      return {
        text,
        url: 'https://www.newadvent.org/fathers/360201.htm',
        type: 'ChurchFather'
      };
    }
    // Generic Leo
    return {
      text,
      url: 'https://www.newadvent.org/fathers/360201.htm',
      type: 'ChurchFather'
    };
  }

  // Origen
  if (source.match(/Origen/i)) {
    // Commentary on Matthew
    if (source.match(/Commentary on Matthew/i)) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/101601.htm',
        type: 'ChurchFather'
      };
    }
    // Homilies on Jeremiah
    if (source.match(/Homilies on Jeremiah/i)) {
      const homMatch = source.match(/Homilies on Jeremiah\s+(\d+)/i);
      if (homMatch) {
        const homNum = parseInt(homMatch[1]);
        return {
          text,
          url: `https://www.newadvent.org/fathers/101${homNum}.htm`,
          type: 'ChurchFather'
        };
      }
    }
    // On First Principles
    if (source.includes('First Principles') || source.includes('On First Principles')) {
      return {
        text,
        url: 'https://www.newadvent.org/fathers/04121.htm',
        type: 'ChurchFather'
      };
    }
    // Generic Origen - don't link to unrelated work
    return {
      text: text + ' (reference only)',
      url: null,
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
    if (source.includes('Deus Caritas Est')) {
      return {
        text,
        url: 'https://www.vatican.va/content/benedict-xvi/en/encyclicals/documents/hf_ben-xvi_enc_20051225_deus-caritas-est.html',
        type: 'PapalDoc'
      };
    }
    if (source.includes('Spe Salvi')) {
      return {
        text,
        url: 'https://www.vatican.va/content/benedict-xvi/en/encyclicals/documents/hf_ben-xvi_enc_20071130_spe-salvi.html',
        type: 'PapalDoc'
      };
    }
    if (source.includes('Verbum Domini')) {
      return {
        text,
        url: 'https://www.vatican.va/content/benedict-xvi/en/apost_exhortations/documents/hf_ben-xvi_exh_20100930_verbum-domini.html',
        type: 'PapalDoc'
      };
    }
    if (source.includes('General Audience')) {
      return {
        text,
        url: 'https://www.vatican.va/content/benedict-xvi/en/audiences.index.html',
        type: 'PapalDoc'
      };
    }
    if (source.includes('Jesus of Nazareth')) {
      // Benedict XVI's book trilogy - mark as book reference
      return {
        text: text + ' (book reference)',
        url: null,
        type: 'PapalDoc'
      };
    }
    if (source.includes('Infancy Narratives')) {
      return {
        text: text + ' (book reference)',
        url: null,
        type: 'PapalDoc'
      };
    }
    if (source.includes('Spirit of Liturgy')) {
      return {
        text: text + ' (book reference)',
        url: null,
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
