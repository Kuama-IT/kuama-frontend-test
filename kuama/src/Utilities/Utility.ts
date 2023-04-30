import { IMAGE_LOGO, OVERVIEW_LABEL, CURRENT_ACCOUNTS, OPEN_ACCOUNTS } from '../Constants/dictionary';
import { AppUrls } from '../Types/AppTypes';


export const SideBarLinks = [
  {
    image:IMAGE_LOGO,
    label:OVERVIEW_LABEL,
    to:AppUrls.OVERVIEW
  },
  {
    image:IMAGE_LOGO,
    label:CURRENT_ACCOUNTS,
    to:AppUrls.CURRENT_ACCOUNTS
  },
  {
    image:IMAGE_LOGO,
    label:OPEN_ACCOUNTS,
    to:AppUrls.OPEN_ACCOUNTS
  }
];