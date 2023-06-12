import { IResource } from '../types'
import Resource from '../resource'
import { "%IClass%" } from './types'

/**
 * "%title%"
 */
export default class "%Class%" extends Resource<"%IClass%"> implements "%IClass%", IResource<"%IClass%"> {
  id = 0
  name = '' //名称
  code = '' //编码
}
