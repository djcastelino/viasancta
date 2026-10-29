# Scripture tools design preview

The homepage’s ivory, plum and gold visual language now continues into Daily Scripture Challenge and Scripture Memory Coach. Both screens share a breadcrumb, large editorial heading, linked tool navigation, quiet footer and light/dark materials. The challenge has a clue board, focused answer panel, progress strip and a post-answer reflection. Memory Coach centres the verse, with a four-step learning guide, clear practice field, saved-progress resume and verse collection. Statistics and challenge history receive matching materials.

Existing learning phases, verse data, progress storage keys and challenge rules remain in use. Guess handling now shares one transition for typed and suggested answers, so newly revealed clues survive reload and a finished game is not counted again. Speech uses the existing server endpoint with cancellation, cleanup on navigation, visible errors, optional challenge music and a spoken-coaching toggle. No audio plays just by opening a screen.

Validation: production build, TypeScript and ten backend/progress/audio tests pass. Targeted ESLint has no errors; inherited unused memory helpers and a cleanup-counter lint warning remain. Browser checks cover guessing, suggestions, completion, reload, saved practice, read/write/recall transitions and mobile layout. Preview only, pending user review.
