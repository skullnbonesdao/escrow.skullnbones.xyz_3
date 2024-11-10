<script setup>
import { ref, watch } from 'vue';
import { useGlobalStore } from 'stores/globalStore';
import TokenIcon from 'components/elements/TokenIcon.vue';
import { userTokenStore } from '../../stores/userTokenStore';
import TextHightlighted from 'components/elements/TextHightlighted.vue';

const emits = defineEmits(['token_change']);
const props = defineProps([
  'label',
  'dense',
  'init_value',
  'show_only_available',
]);

const model = ref(props.init_value);
const options = ref(useGlobalStore().token_list);

watch(
  () => model.value,
  () => {
    emits('token_change', model.value);
  },
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
            (v) =>
              v.name.toLowerCase().indexOf(needle.toLowerCase()) > -1 ||
              v.address.toLowerCase().indexOf(needle.toLowerCase()) > -1 ||
              v.symbol.toLowerCase().indexOf(needle.toLowerCase()) > -1,
          );
        }

        if (props.show_only_available) {
          options.value = options.value.filter(
            (option) =>
              userTokenStore().accounts.find(
                (acc) =>
                  acc.account.data.parsed.info.mint.toString() ==
                  option.address.toString(),
              )?.account.data.parsed.info.tokenAmount.uiAmount > 0,
          );
        }
      },

      // "ref" is the Vue reference to the QSelect
      (ref) => {
        if (val !== '' && ref.options.length > 0) {
          ref.setOptionIndex(-1); // reset optionIndex in case there is something selected
          ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
        }
      },
    );
  }, 300);
}

function abortFilterFn() {
  // console.log('delayed filter aborted')
}

const select_value = ref();
</script>

<template>
  <q-select
    :label="props.label ?? 'Token'"
    square
    filled
    v-model="model"
    @input-value="(v) => (select_value = v)"
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
          <div class="row">
            <div class="">
              <q-item-label>
                <div class="row q-gutter-x-sm">
                  <TextHightlighted
                    class="col-4"
                    :search="select_value"
                    :text="'[' + scope.opt.symbol.toString() + ']'"
                  />
                  <TextHightlighted
                    class="col"
                    :search="select_value"
                    :text="scope.opt.name.toString()"
                  />
                </div>
              </q-item-label>
              <q-item-label caption class="overflow-auto">
                <TextHightlighted
                  :search="select_value"
                  :text="scope.opt.address.toString()"
                />
              </q-item-label>
            </div>
            <div class="col text-right">
              <q-item-label caption>Available</q-item-label>

              <q-item-label>
                {{
                  userTokenStore().accounts.find(
                    (acc) =>
                      acc.account.data.parsed.info.mint.toString() ==
                      scope.opt.address.toString(),
                  )?.account.data.parsed.info.tokenAmount.uiAmount ?? '-'
                }}</q-item-label
              >
            </div>
          </div>
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
