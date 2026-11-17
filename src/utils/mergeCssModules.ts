export type CssModule = Readonly<Record<string, string>>

export function mergeCssModules(...modules: CssModule[]): CssModule {
  const merged: Record<string, string> = {}
  for (const module of modules) {
    for (const [name, hashed] of Object.entries(module)) {
      merged[name] = merged[name] ? `${merged[name]} ${hashed}` : hashed
    }
  }
  return merged
}
