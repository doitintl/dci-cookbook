# Repository Guidelines

The cookbook is organized around runnable examples and reference articles for DoiT products and APIs.

Narrative guides and long-form docs live in articles/, and shared diagrams or screenshots belong in images/. Update registry.yaml whenever you add content so it appears on cookbook.openai.com, and add new author metadata in authors.yaml if you want custom attribution. Keep large datasets outside the repo; instead, document how to fetch them in the notebook.

## Metadata & Publication Workflow
New or relocated content must have an entry in registry.yaml with an accurate path, date, and tag set so the static site generator includes it. When collaborating, coordinate author slugs in authors.yaml to avoid duplicates, and run python -m yaml lint registry.yaml (or your preferred YAML linter) to catch syntax errors before submitting.