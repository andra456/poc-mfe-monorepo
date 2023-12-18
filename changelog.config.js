module.exports = {
  disableEmoji: false,
  list: ['test', 'feat', 'fix', 'docs', 'refactor', 'style', 'release'],
  maxMessageLength: 80,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body'],
  scopes: [],
  types: {
    docs: {
      description: 'Documentation changes',
      emoji: '',
      value: 'docs',
    },
    feat: {
      description: 'Create new feature / enhance changes',
      emoji: '',
      value: 'enc',
    },
    fix: {
      description: 'A fixing bugs changes',
      emoji: '',
      value: 'fix',
    },
    refactor: {
      description: 'Code fixes a minor bug or adds a feature also improve code',
      emoji: '',
      value: 'refactor',
    },
    release: {
      description: 'Create release commit',
      emoji: '',
      value: 'release',
    },
    style: {
      description: 'Create / edit style, white-space, formatting,',
      emoji: '',
      value: 'style',
    },
    test: {
      description: 'Create test & coverage',
      emoji: '',
      value: 'test',
    },
  },
};
