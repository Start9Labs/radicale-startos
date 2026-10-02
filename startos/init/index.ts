import { actions } from '../actions'
import { restoreInit } from '../backups'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { versionGraph } from '../versions'
import { seedConfig } from './seedConfig'
import { watchUsers } from './watchUsers'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedConfig,
  setInterfaces,
  setDependencies,
  actions,
  watchUsers,
)

export const uninit = sdk.setupUninit(versionGraph)
