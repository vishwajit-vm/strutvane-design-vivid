/**
 * `withIcons()`: Vivid with more icons than the curated set.
 *
 * @module
 */
import { type Design, defineDesign } from '@strutvane/ui/design'
import { createIconSkin, VIVID_ICONS, type VividIconSet } from './icons.tsx'
import { vivid } from './vivid.ts'

/**
 * A copy of Vivid whose `Icon` skin also draws `extra` (Tabler icon components by Tabler name).
 * Use it when your manifest or sidebar names icons outside {@link VIVID_ICONS}: only the icons you
 * import end up in your bundle. Names in `extra` win over Vivid's own. The result is checked by
 * `defineDesign()` again, like any design.
 *
 * @example
 * import { IconTruckDelivery } from '@tabler/icons-react'
 * export const design = withIcons({ 'truck-delivery': IconTruckDelivery })
 */
export function withIcons(extra: VividIconSet): Design {
  return defineDesign({
    ...vivid,
    skins: { ...vivid.skins, Icon: createIconSkin({ ...VIVID_ICONS, ...extra }) },
  })
}
