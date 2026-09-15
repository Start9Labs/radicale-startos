import { configFile, radicaleConfig } from '../fileModels/config'
import { sdk } from '../sdk'

export const seedConfig = sdk.setupOnInit(async (effects) => {
  const current = await configFile.read().const(effects)
  if (current !== radicaleConfig) {
    await configFile.write(effects, radicaleConfig, {
      allowWriteAfterConst: true,
    })
  }
})
