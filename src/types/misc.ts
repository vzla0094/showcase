export interface ICustomIconProps {
  size?: number
  color?: string
}

export const VIEW_CONTAINER_SPACING = {
  OUTER_PADDING: 2,
  INNER_PADDING: 5,
} as const

type ObjectValues<T> = T[keyof T]

export type ViewContainerSpacing = ObjectValues<typeof VIEW_CONTAINER_SPACING>
