# Project Notes for Agents

## Shape of This Site

This is a small static personal site. Keep the default build surface simple:

- Prefer plain `html`, `css`, and `js`.
- Existing pages use CDN assets such as Tailwind, GSAP, Font Awesome, and Lucide.
- Do not introduce a package manager or bundler unless a task truly needs it.
- `index.html` owns the liquid bottom-tab shell and the main four tab sections.
- `tools/` contains older standalone experiments that can be referenced, but the homepage Lab tab should feel native to the homepage UI.

## Visual Direction

The homepage uses an off-white background, black typography, thin borders, liquid glass, and a draggable prism nav. New UI should keep that language:

- Use restrained black/off-white structure with a few sharp accents.
- Keep controls compact and tool-like, not marketing-like.
- Use Lucide icons for controls when available.
- Use GSAP for page and panel motion already present on the homepage.
- Avoid nested card layouts, oversized rounded rectangles, and generic purple-blue gradient styling.

## Lab Photo Editor

The Lab tab is intended to become a browser photo editor.

- Image processing should stay GPU-first through WebGL shaders and framebuffer ping-pong.
- Avoid CPU per-pixel loops for interactive sliders.
- Batch upload is a core workflow; preserve the queue and active-photo model.
- Soft focus currently uses tone preprocessing, downsampled separable Gaussian blur, and soft-light/screen compositing.
- When adding new photo effects, add them as shader passes or shader uniforms rather than canvas 2D filters.
- Keep WebGL code defensive: check shader compile/link errors, texture size limits, and empty-image states.

## Verification

Before handing off frontend work:

- Run a syntax sanity check on inline scripts when possible.
- Load the site locally and check the Lab tab at desktop and mobile widths.
- Verify upload, queue switching, slider rendering, compare, current export, and batch export after edits that touch the editor.
