import IsaacImage from 'assets/landing/team/isaac.webp'
import VivianImage from 'assets/landing/team/vivian.webp'
import PodyImage from 'assets/landing/team/pody.webp'
import HenryImage from 'assets/landing/team/henry.webp'
import MalikImage from 'assets/landing/team/malik.webp'
import CanImage from 'assets/landing/team/can.webp'

import { Translate } from 'next-translate'

export const getTopRows = (t: Translate) => {
  return [
    {
      name: 'Malik Zulqurnain',
      designation: t('TEAM_PROGRAMMING'),
      designationTwo: t('TEAM_WIZARD'),
      Image: MalikImage
    },
    {
      name: 'Vivian Wu',
      designation: t('TEAM_FOUNDER'),
      designationTwo: t('TEAM_CONTENT_CRUSADER'),
      Image: VivianImage
    },
    {
      name: 'Isaac Martin',
      designation: t('TEAM_ARCHITECT'),
      Image: IsaacImage
    }
  ]
}

export const getBottomRows = (t: Translate) => {
  return [
    {
      name: 'Pody Lui',
      designation: t('TEAM_TRIBE_LEADER'),
      Image: PodyImage
    },
    {
      name: 'Henry Akira',
      designation: t('TEAM_CODE_MASTER'),
      Image: HenryImage
    },
    {
      name: 'Can Uzun',
      designation: t('TEAM_DIGITAL_DREAMER'),
      Image: CanImage
    }
  ]
}
