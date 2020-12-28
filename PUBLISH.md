1. Update the version in your project's package.json file (e.g. 1.2.3)

```diff
- "version": "0.2.5",
+ "version": "0.2.6",
```

2. Commit that change

```bash
git stage .
git commit -am v0.2.6
```

3. Tag your commit. Make sure your tag name's format is v\*.\*.\*. Your workflow will use this tag to detect when to create a release

```bash
git tag v0.2.6
```

4. Push your changes to GitHub

```bash
git push
git push --tags
```
