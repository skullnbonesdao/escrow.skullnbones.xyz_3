<script setup>
import { ref, watch } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import TokenIcon from 'components/elements/TokenIcon.vue';

const emits = defineEmits(['token_change']);
const props = defineProps(['dense', 'init_value']);

const model = ref(props.init_value);
const options = ref(useGlobalStore().token_list);

watch(
    () => model.value,
    () => {
        emits('token_change', model.value);
    }
);

function filterFn(val, update) {
    setTimeout(() => {
        update(
            () => {
                if (val === '') {
                    options.value = useGlobalStore().token_list;
                } else {
                    const needle = val.toLowerCase();
                    options.value = useGlobalStore().token_list.filter(
                        (v) => v.name.toLowerCase().indexOf(needle) > -1
                    );
                }
            },

            // "ref" is the Vue reference to the QSelect
            (ref) => {
                if (val !== '' && ref.options.length > 0) {
                    ref.setOptionIndex(-1); // reset optionIndex in case there is something selected
                    ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
                }
            }
        );
    }, 300);
}

function abortFilterFn() {
    // console.log('delayed filter aborted')
}
</script>

<template>
    <q-select
        label="Token"
        square
        filled
        v-model="model"
        input-debounce="0"
        use-input
        clearable
        behavior="dialog"
        :options="options"
        :dense="dense"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
    >
        <template v-slot:selected>
            <div class="row items-center q-gutter-x-sm no-wrap">
                <div>
                    {{ model?.name ?? '' }}
                </div>
            </div>
        </template>

        <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                    <TokenIcon :src="scope.opt.logoURI" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>{{
                        scope.opt.description
                    }}</q-item-label>
                </q-item-section>
            </q-item>
        </template>

        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>
