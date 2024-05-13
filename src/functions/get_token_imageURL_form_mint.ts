import { useGlobalStore } from 'stores/globalStore';

export function get_token_imageURL_form_mint(mint?: string | undefined) {
  if (mint)
    return (
      useGlobalStore().token_list.find((token) => token.address == mint)
        ?.logoURI ?? 'unknown.png'
    );
  else return 'unknown.png';
}
