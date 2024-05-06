<template>
    <q-layout view="hHh lpr fFf">
        <q-header class="bg-primary text-white" height-hint="100">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <q-img src="logo.svg" />
                    </q-avatar>
                    Escrow Service
                </q-toolbar-title>
                <q-space />
                <WalletMultiButton dark />
            </q-toolbar>

            <q-tabs align="left" inline-label>
                <q-route-tab
                    icon="countertops"
                    to="/exchange"
                    label="Exchange"
                />
                <q-route-tab
                    icon="design_services"
                    to="/manage"
                    label="Manage"
                />
                <q-route-tab label="FAQ" icon="quiz" to="/faq" />
            </q-tabs>
            <q-separator />
        </q-header>

        <q-drawer
            show-if-above
            v-if="useGlobalStore().showLeftDrawer"
            side="left"
            bordered
        >
            <FilterEscrows />
        </q-drawer>

        <q-drawer
            show-if-above
            v-if="useGlobalStore().showRightDrawer"
            side="right"
            bordered
        >
            <div>
                <q-tabs class="bg-secondary">
                    <q-route-tab
                        icon="aspect_ratio"
                        :to="
                            '/details/' +
                            useGlobalStore().escrow_selected?.publicKey.toString()
                        "
                        exact
                    />
                </q-tabs>
            </div>
            <EscrowTakeView />
        </q-drawer>

        <q-page-container>
            <router-view  class="bg-gradient"/>
        </q-page-container>

        <q-footer class="bg-dark">
            <q-separator />
            <q-toolbar>
                <q-toolbar-title class="row items-center">
                    <div class="col">
                        <q-img
                            src=" sa-powered_by_the_people.png"
                            width="100px"
                        />
                    </div>
                    <div
                        class="col text-subtitle2 text-center"
                        style="font-size: 10px"
                        @click="
                            copy_to_clipboard(
                                'budkxEapRhWjRYXSEurLjyT9jpsd92y1smqMYzSBgTC'
                            )
                        "
                    >
                        {{
                            format_address(
                                'budkxEapRhWjRYXSEurLjyT9jpsd92y1smqMYzSBgTC'
                            )
                        }}
                    </div>

                    <div class="col text-right text-subtitle2">v{{ v }}</div>
                    <div class="">
                        <q-btn flat class="q-mx-sm" round to="/settings">
                            <q-avatar size="30px">
                                <q-icon name="settings" />
                            </q-avatar>
                        </q-btn>
                        <q-btn
                            flat
                            class="q-mx-sm"
                            round
                            @click="useQuasar().dark.toggle"
                        >
                            <q-avatar size="30px">
                                <q-icon name="info" />
                            </q-avatar>
                        </q-btn>
                    </div>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import { version } from 'src/../package.json';
import { copy_to_clipboard } from 'src/functions/copy_to_clipboard';
import { WalletMultiButton } from 'solana-wallets-vue';
import FilterEscrows from 'components/filters/FilterEscrows.vue';
import EscrowTakeView from 'components/views/EscrowTakeView.vue';
import { format_address } from '../functions/format_address';
import { useQuasar } from 'quasar';

const v = version;

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

onMounted(() => {
    leftDrawerOpen.value = useGlobalStore().showLeftDrawer;
    rightDrawerOpen.value = useGlobalStore().showRightDrawer;
});
</script>
<style>
/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
