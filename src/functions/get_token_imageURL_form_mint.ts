import { useGlobalStore } from 'stores/globalStore';

export function get_token_imageURL_form_mint(mint: string) {
    return useGlobalStore().token_list.find((token) => token.address == mint)
        ?.logoURI;
}
