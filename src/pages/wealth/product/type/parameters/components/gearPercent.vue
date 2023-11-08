<template>
  <div class="gearPercent">
      <a-card>
        <template #title>
          <div>
            {{ $t('components.gearPercent.5umxkxwaink0') }}
          </div>
        </template>
        <a-row :gutter="16">
          <a-col :xs="24" :sm="12" :md="24" :xl="24">
            <a-form-item field="account" :label="$t('components.gearPercent.5umxkxwajhk0')">
              <template #label>
              <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                  width="1em" height="1em">
                  <path
                    d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                  </path>
                </svg>
              </strong>
              <span>{{$t('components.gearPercent.5umxkxwajhk0')}}</span>
            </template>
              <a-input @change="inputChange($event, 'step')" :placeholder="$t('components.gearPercent.5umxkxwajo40')" allow-clear  v-model="config.step">
                <template #append>
                  %
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="account" :label="$t('components.gearPercent.5umxkxwajr00')">
              <template #label>
              <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                  width="1em" height="1em">
                  <path
                    d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                  </path>
                </svg>
              </strong>
              <span>{{$t('components.gearPercent.5umxkxwajr00')}}</span>
            </template>
              <a-input @change="inputChange($event, 'max')" :placeholder="$t('components.gearPercent.5umxkxwajo40')"  allow-clear  v-model="config.max">
                <template #append>
                  %
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="account" :label="$t('components.gearPercent.5umxkxwajtk0')">
              <template #label>
              <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                  width="1em" height="1em">
                  <path
                    d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                  </path>
                </svg>
              </strong>
              <span>{{$t('components.gearPercent.5umxkxwajtk0')}}</span>
            </template>
              <a-input  @change="inputChange($event, 'min')" :placeholder="$t('components.gearPercent.5umxkxwajo40')" allow-clear  v-model="config.min">
                <template #append>
                  %
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="account" :label="$t('components.gearPercent.5umxkxwajwg0')">
              <a-input @change="inputChange($event, 'value')" :placeholder="$t('components.gearPercent.5umxkxwajo40')" allow-clear  v-model="config.value">
                <template #append>
                  %
                </template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue"
const { t } = useI18n();
const props = defineProps({
  config: {
    type: Object,
    default() {
      return {};
    },
  }
});
const config:any = ref(props.config)
const inputChange = (value: string, name: string) => {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  const zmchineseRegex = /[a-zA-Z]/;
  if (chineseRegex.test(value)) {
    Message.info({ content: t('components.gearPercent.5umxkxwajz00') })
    config.value[name] = ''
    return
  }
  if (zmchineseRegex.test(value)) {
    Message.info({ content: t('components.gearPercent.5umxkxwak1g0') })
    config.value[name] = ''
    return
  }
  if (value < '0') {
    Message.info({ content: t('components.gearPercent.5umxkxwak3s0') })
    config.value[name] = ''
    return
  }
  if (!config.value.step) {
    Message.info({ content: t('components.gearPercent.5umxkxwajo40') })
    config.value[name] = ''
    return
  }
  if (Number(value) % Number(config.value.step) != 0) {
    Message.info({ content: t('components.gearPercent.5umxkxwak640') })
    config.value[name] = ''
    return
  }
  if (Number(config.value.min) > Number(config.value.max)) {
    Message.info({ content: t('components.gearPercent.5umxkxwak8g0') })
    config.value.max = ''
    config.value.min = ''
    return
  }
  if ((Number(config.value.max) - Number(config.value.min)) % Number(config.value.step) != 0) {
    Message.info({ content: t('components.gearPercent.5umxkxwakaw0') })
    config.value[name] = ''
    return
  }
}
</script>

<style lang="less" scoped>
.gearPercent {
  width: 100%;
  padding-bottom: 10px;
}
</style>
