const config = {
  $schema: 'https://unpkg.com/release-it@20/schema/release-it.json',
  git: {
    commitMessage: 'chore: release v${version}',
    requireCommits: true
  },
  github: {
    release: true,
    releaseName: 'v${version}'
  },
  npm: {
    publish: false
  },
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
  userUrlFormat: '{{host}}/{{user}}',
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      header: '# Changelog\n\nAll notable changes to this project will be documented in this file. See [release-it](https://github.com/release-it/release-it) and [@release-it/conventional-changelog](https://github.com/release-it/conventional-changelog) for commit guidelines.\n',
      preset: {
        name: 'conventionalcommits',
        types: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'perf', section: 'Performance Improvements' },
          { type: 'refactor', section: 'Code Refactoring' },
          { type: 'docs', section: 'Documentation' },
          { type: 'ci', section: 'CI/CD' },
          { type: 'security', section: 'Security Improvements' },
          { type: 'chore', hidden: true },
          { type: 'style', hidden: true },
          { type: 'test', hidden: true },
          { type: 'release', hidden: true }
        ]
      },
      whatBump(commits) {
        let level = 2; // patch
        for (const commit of commits) {
          const msg = commit.header || '';
          if (/BREAKING[ -]CHANGE|!:/i.test(msg)) return { level: 0 };
          if (/^feat/i.test(msg)) level = Math.min(level, 1);
        }
        return { level };
      }
    }
  }
};

export default config;
