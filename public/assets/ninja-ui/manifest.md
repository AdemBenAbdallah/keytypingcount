# Ninja UI Asset Manifest

This folder contains the reusable UI art for the ninja typing game interface.

## Rules for AI implementation

- Use only the assets listed here.
- Do not redraw or restyle the artwork.
- Do not bake text into images; render all labels, words, numbers, and dynamic content in code.
- Keep the original proportions, textures, shadows, and glow treatment.
- Layer assets in the order documented below.
- Prefer the `*_dark.webp` assets for idle/inactive states and `*_orange_glow.webp` assets for active/selected states.
- Use `panel_wood_banner_*` as the primary top navigation/button family unless you intentionally want the alternate `panel_wooden_banner_*` family.

## Reference composition guide

This UI should be assembled to match the reference image with these major zones:

### Top zone

- Full-width wooden navigation bar
- Center emblem above the bar
- Left vertical scroll/lantern decoration
- Right side decorative pillar
- Tab buttons and time selector inside the top bar

### Middle zone

- Large parchment writing panel centered on screen
- Decorative cloud motifs in the corners
- Crack and ink overlay textures kept subtle

### Bottom zone

- Wooden table/ledge foreground
- Papers, scroll, kunai, shuriken, and headband props
- Props should sit in front of the parchment panel and near the bottom edge

### Text zone

- All words, numbers, and labels are rendered in code
- No text should be baked into image assets
- The active typing cursor and typed words should also be rendered in code

## Recommended layer order

1. Full-screen background
2. Atmospheric overlays and dust/ink effects
3. Main parchment panel
4. Decorative parchment strips, corners, and blocks
5. Top wooden navigation bar / button frames
6. Tabs, icons, and emblem marks
7. Side scroll pillars and bottom props
8. Text/content rendered in code
9. Active glows, hover states, and accent effects

---

## 1) Background

- `background_ninja_village_sunset.webp`
  - Full-screen cinematic background scene.
  - Use as the base layer behind everything.
  - Layer: 0

---

## 2) Main parchment panel pieces

- `panel_parchment_main.webp`
  - Main large parchment writing area.
  - Use as the central content panel behind typing text.
  - Layer: 3

- `panel_parchment_strip_top_center.webp`
  - Top decorative parchment strip segment.
  - Use as a trim or header accent above the main panel.
  - Layer: 3

- `panel_parchment_strip_mid_left.webp`
  - Mid-left parchment strip segment.
  - Use for framing or partial border composition.
  - Layer: 3

- `panel_parchment_strip_mid_right.webp`
  - Mid-right parchment strip segment.
  - Use for framing or partial border composition.
  - Layer: 3

- `panel_parchment_corner_top_left.webp`
  - Top-left parchment corner piece.
  - Use as a decorative frame corner.
  - Layer: 3

- `panel_parchment_corner_top_midleft.webp`
  - Alternate top-left/inner corner piece.
  - Use as a border detail or spacer piece.
  - Layer: 3

- `panel_parchment_corner_top_right.webp`
  - Top-right parchment corner piece.
  - Use as a decorative frame corner.
  - Layer: 3

- `panel_parchment_block_left.webp`
  - Left parchment block accent.
  - Use as a side border/end cap detail.
  - Layer: 3

- `panel_parchment_block_right.webp`
  - Right parchment block accent.
  - Use as a side border/end cap detail.
  - Layer: 3

---

## 3) Wood UI panels and banners

- `nav_bar_main_idle.webp`
  - Main dark wooden top navigation bar.
  - Use as the primary top bar background.
  - Layer: 2

- `panel_wood_banner_idle.webp`
  - Primary idle wooden banner/tab background.
  - Use for inactive buttons or tabs.
  - Layer: 2

- `panel_wood_banner_hover.webp`
  - Wooden banner hover state.
  - Use when a tab/button is hovered.
  - Layer: 2

- `panel_wood_banner_active_glow.webp`
  - Wooden banner active state with orange glow.
  - Use for selected/active tab or button.
  - Layer: 2

- `panel_wooden_banner_idle.webp`
  - Alternate wooden banner idle state.
  - Use only if the primary `panel_wood_banner_idle.webp` does not fit a specific component.
  - Layer: 2

- `panel_wooden_banner_active_glow.webp`
  - Alternate wooden banner active state with orange glow.
  - Use only if the primary `panel_wood_banner_active_glow.webp` does not fit a specific component.
  - Layer: 2

- `panel_wood_long.webp`
  - Long wooden plank/frame piece.
  - Use for wide structural trims or separators.
  - Layer: 2

- `panel_wood_medium.webp`
  - Medium wooden frame piece.
  - Use for intermediate separators or trimmed button backgrounds.
  - Layer: 2

- `panel_wood_right.webp`
  - Right-end wooden frame piece.
  - Use as a terminal cap or right-side structural segment.
  - Layer: 2

- `panel_wood_cap_small.webp`
  - Small wooden cap/connector piece.
  - Use as a joint, end cap, or decorative connector.
  - Layer: 2

- `panel_plaque_center.webp`
  - Center plaque-like wooden panel.
  - Use for a special center button, title plate, or decorative badge area.
  - Layer: 2

---

## 4) Emblems

- `emblem_leaf_dark.webp`
  - Dark leaf/swirl emblem.
  - Use for idle logo marks and decorative badges.
  - Layer: 2

- `emblem_leaf_brown.webp`
  - Brown leaf/swirl emblem variant.
  - Use for a softer/aged emblem tone.
  - Layer: 2

- `emblem_leaf_orange_glow.webp`
  - Orange glowing active leaf/swirl emblem.
  - Use for active logo marks or highlighted states.
  - Layer: 2

- `emblem_mountain_dark.webp`
  - Dark mountain-themed emblem.
  - Use as an alternate decorative mark or tab icon.
  - Layer: 2

- `emblem_mountain_orange_glow.webp`
  - Orange glowing mountain emblem.
  - Use for active or selected mountain-style state.
  - Layer: 2

- `emblem_star_dark.webp`
  - Dark star/shuriken-style emblem.
  - Use as an alternate decorative mark or icon.
  - Layer: 2

- `emblem_star_orange_glow.webp`
  - Orange glowing star/shuriken-style emblem.
  - Use for active or selected state.
  - Layer: 2

---

## 5) Tab / menu icons

Use the dark version for inactive state and the orange glow version for active state.

- `icon_time_dark.webp`
- `icon_time_orange_glow.webp`
  - Time/tab icon.
  - Layer: 2

- `icon_quill_dark.webp`
- `icon_quill_orange_glow.webp`
  - Words/text-related icon.
  - Layer: 2

- `icon_quotes_dark.webp`
- `icon_quotes_orange_glow.webp`
  - Quote icon.
  - Layer: 2

- `icon_wrench_dark.webp`
- `icon_wrench_orange_glow.webp`
  - Custom/settings icon.
  - Layer: 2

- `icon_question_dark.webp`
- `icon_question_orange_glow.webp`
  - Question/help icon.
  - Layer: 2

- `icon_exclamation_dark.webp`
- `icon_exclamation_orange_glow.webp`
  - Attention/alert-style icon.
  - Layer: 2

- `icon_chat_dark.webp`
- `icon_chat_orange_glow.webp`
  - Chat/dialog icon.
  - Layer: 2

---

## 6) Decorative overlays and effects

These should be layered lightly to enhance texture without blocking readability.

- `ornament_cloud_center.webp`
  - Center cloud ornament.
  - Use as a subtle decorative motif.
  - Layer: 1 or 3

- `ornament_cloud_large_left.webp`
  - Large cloud ornament for the left side.
  - Layer: 1 or 3

- `ornament_cloud_large_right.webp`
  - Large cloud ornament for the right side.
  - Layer: 1 or 3

- `ornament_cloud_small_left.webp`
  - Small cloud ornament left.
  - Layer: 1 or 3

- `ornament_cloud_small_midleft.webp`
  - Small cloud ornament mid-left.
  - Layer: 1 or 3

- `ornament_cloud_small_center.webp`
  - Small cloud ornament center.
  - Layer: 1 or 3

- `ornament_cloud_small_centerright.webp`
  - Small cloud ornament center-right.
  - Layer: 1 or 3

- `ornament_cloud_small_right.webp`
  - Small cloud ornament right.
  - Layer: 1 or 3

- `effect_crack_center.webp`
  - Center crack texture overlay.
  - Use sparingly on parchment or panel surfaces.
  - Layer: 1 or 4

- `effect_crack_cluster_right.webp`
  - Cluster of cracks on the right.
  - Layer: 1 or 4

- `effect_crack_left_center.webp`
  - Crack texture for the left-center area.
  - Layer: 1 or 4

- `effect_crack_long_left.webp`
  - Long crack on the left side.
  - Layer: 1 or 4

- `effect_crack_long_right.webp`
  - Long crack on the right side.
  - Layer: 1 or 4

- `effect_crack_low_center_right.webp`
  - Low crack cluster near center-right.
  - Layer: 1 or 4

- `effect_crack_vertical.webp`
  - Vertical crack texture.
  - Layer: 1 or 4

- `effect_crack_wide_center.webp`
  - Wide crack texture in the center.
  - Layer: 1 or 4

- `effect_dust_spray.webp`
  - Dust/smoke spray effect.
  - Use for atmosphere or transition effects.
  - Layer: 1 or 7

- `effect_ink_dots_cluster.webp`
  - Cluster of ink dots.
  - Use as a subtle ink texture accent.
  - Layer: 1 or 4

- `effect_ink_splat_large_left.webp`
  - Large ink splat on the left.
  - Layer: 1 or 4

- `effect_ink_splat_small_center.webp`
  - Small center ink splat.
  - Layer: 1 or 4

- `effect_ink_splat_small_left.webp`
  - Small left ink splat.
  - Layer: 1 or 4

- `effect_ink_splat_small_right.webp`
  - Small right ink splat.
  - Layer: 1 or 4

---

## 7) Side scroll pillars

- `scroll_pillar_left.webp`
  - Left vertical scroll pillar.
  - Use as the left side decorative column.
  - Layer: 4

- `scroll_pillar_right.webp`
  - Right vertical scroll pillar.
  - Use as the right side decorative column.
  - Layer: 4

---

## 8) Props and foreground objects

- `prop_headband_leaf_main.webp`
  - Ninja headband / forehead protector with leaf emblem.
  - Use as a decorative foreground prop.
  - Layer: 5

- `prop_kunai_main.webp`
  - Kunai weapon prop.
  - Use near the bottom-right or foreground area.
  - Layer: 5

- `prop_shuriken_main.webp`
  - Shuriken prop.
  - Use as a bottom or corner decoration.
  - Layer: 5

- `prop_scroll_red.webp`
  - Red rolled scroll prop.
  - Layer: 5

- `prop_scroll_parchment.webp`
  - Parchment rolled scroll prop.
  - Layer: 5

- `prop_scroll_dark.webp`
  - Dark rolled scroll prop.
  - Layer: 5

- `prop_papers_stack.webp`
  - Stack of loose papers.
  - Use as a desk/foreground detail.
  - Layer: 5

- `prop_wood_table.webp`
  - Wooden table or ledge foreground strip.
  - Use as the bottom base surface.
  - Layer: 5

---

## 9) Recommended UI mapping

### Top navigation

- Background bar: `nav_bar_main_idle.webp`
- Button frame state: `panel_wood_banner_idle.webp`
- Hover state: `panel_wood_banner_hover.webp`
- Active state: `panel_wood_banner_active_glow.webp`
- Alternate wood button family: `panel_wooden_banner_idle.webp`, `panel_wooden_banner_active_glow.webp`
- Tab icons: use the `icon_*_dark.webp` and `icon_*_orange_glow.webp` pairs
- Logo/emblem: use one of the `emblem_*` assets

### Main content area

- Main panel: `panel_parchment_main.webp`
- Corner/trim pieces: the `panel_parchment_*` assets
- Decorative clouds: the `ornament_cloud_*` assets
- Cracks/ink: the `effect_*` assets

### Bottom foreground

- Use `prop_wood_table.webp` as the base
- Add `prop_papers_stack.webp`, `prop_scroll_*`, `prop_headband_leaf_main.webp`, `prop_kunai_main.webp`, and `prop_shuriken_main.webp` as accent props

---

## 10) Implementation notes for AI

- Treat this folder as a reusable art kit, not a finished screenshot.
- The screen should be assembled by code from these parts.
- All text should be drawn in the app layer, not inside the art.
- Keep spacing generous so interactive elements remain readable.
- Prefer the glow variants only for active or selected states.
- If an asset family has both “banner” and “wooden banner” variants, use one family consistently within a single UI screen.
