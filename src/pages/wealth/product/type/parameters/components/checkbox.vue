<template>
  <div class="checkbox">
    <a-card>
      <template #title>
        <div style="display: flex;justify-content: space-between;">
          <div>
            {{ $t('components.checkbox.5umxjx1kask0') }}
          </div>
          <div>
            <a-button type="primary" @click="add">
              <template #icon>
                <icon-plus />
              </template>
              {{$t('components.checkbox.5umxjx1kblg0')}}
            </a-button>
          </div>
        </div>
      </template>
      <a-row :gutter="16">
        <a-form-item field="account">
          <template #label>
            <span>{{$t('components.checkbox.5umxjx1kbsg0')}}</span>
          </template>
          <a-input @change="inputChange($event, 'max')" :placeholder="$t('components.checkbox.5umxjx1kbxg0')" allow-clear v-model="config.max">
          </a-input>
        </a-form-item>
        <div style="width: 100%;" v-if="config.options.length">
          <div class="listStyle" v-for="(item, index) in config.options" v-if="config.options.length == 1">
            <div style="display: flex;justify-content: space-between;padding: 10px 10px 20px;">
              <div>#0{{ index + 1 }}</div>
              <div style="display: flex;">
                <div style="width: 30px;text-align: right;cursor: pointer;" v-if="index != 0" @click="Topping(item)">
                  <icon-to-top size="15" />
                </div>
                <div style="width: 30px;text-align: right;cursor: pointer;" v-if="config.options.length > 1">
                  <icon-drag-dot-vertical size="15" />
                </div>
                <div style="width: 30px;text-align: right;color: red;cursor: pointer;" @click="handleRemove(item)">
                  <icon-delete size="15" />
                </div>
              </div>
            </div>
            <a-col :xs="24" :sm="12" :md="24" :xl="24">
              <a-form-item field="account">
                <template #label>
                  <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                      width="1em" height="1em">
                      <path
                        d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                      </path>
                    </svg>
                  </strong>
                  <span>{{$t('components.checkbox.5umxjx1kc1g0')}}</span>
                </template>
                <a-input :placeholder="$t('components.checkbox.5umxjx1kbxg0')" allow-clear v-model="item.key">
                </a-input>
              </a-form-item>
              <a-form-item field="text" v-if="!item.isshowsq">
                <template #label>
                  <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                      width="1em" height="1em">
                      <path
                        d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                      </path>
                    </svg>
                  </strong>
                  <span>{{$t('components.checkbox.5umxjx1kc6c0')}}</span>
                </template>
                <a-input :placeholder="$t('components.checkbox.5umxjx1kca80')" allow-clear v-model="item.text['zh-CN']">
                </a-input>
              </a-form-item>
              <a-form-item field="text" v-if="!item.isshowsq">
                <template #label>
                  <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                      width="1em" height="1em">
                      <path
                        d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                      </path>
                    </svg>
                  </strong>
                  <span>{{$t('components.checkbox.5umxjx1kcf40')}}</span>
                </template>
                <a-input :placeholder="$t('components.checkbox.5umxjx1kcjs0')" allow-clear v-model="item.text['tc']">
                </a-input>
              </a-form-item>
              <a-form-item field="text" :label="$t('components.checkbox.5umxjx1kcnw0')" v-if="!item.isshowsq">
                <template #label>
                  <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                      width="1em" height="1em">
                      <path
                        d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                      </path>
                    </svg>
                  </strong>
                  <span>{{$t('components.checkbox.5umxjx1kcnw0')}}</span>
                </template>
                <a-input :placeholder="$t('components.checkbox.5umxjx1kcso0')" allow-clear v-model="item.text['en']">
                </a-input>
              </a-form-item>
              <div style="display: flex;justify-content: space-between;">
                <div>
                  <a-radio v-model="item.isshowxz">{{$t('components.checkbox.5umxjx1kd040')}}</a-radio>
                </div>
                <div v-if="!item.isshowsq" @click="item.isshowsq = !item.isshowsq" style="cursor: pointer;">
                  {{$t('components.checkbox.5umxjx1kd5c0')}}
                </div>
                <div v-if="item.isshowsq" @click="item.isshowsq = !item.isshowsq" style="cursor: pointer;">
                  {{$t('components.checkbox.5umxjx1kd9w0')}}
                </div>
              </div>
            </a-col>
          </div>
          <VueDraggableNext v-model="config.options" v-else>
            <div class="listStyle" v-for="(item, index) in config.options">
              <div style="display: flex;justify-content: space-between;padding: 10px 10px 20px;">
                <div>#0{{ index + 1 }}</div>
                <div style="display: flex;">
                  <div style="width: 30px;text-align: right;cursor: pointer;" v-if="index != 0" @click="Topping(item)">
                    <icon-to-top size="15" />
                  </div>
                  <div style="width: 30px;text-align: right;cursor: pointer;" v-if="config.options.length > 1">
                    <icon-drag-dot-vertical size="15" />
                  </div>
                  <div style="width: 30px;text-align: right;color:color: rgb(247, 105, 101);cursor: pointer;"
                    @click="handleRemove(item)">
                    <icon-delete size="15" />
                  </div>
                </div>
              </div>
              <a-col :xs="24" :sm="12" :md="24" :xl="24">
                <a-form-item field="account">
                  <template #label>
                    <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                          d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                      </svg>
                    </strong>
                    <span>{{$t('components.checkbox.5umxjx1kc1g0')}}</span>
                  </template>
                  <a-input :placeholder="$t('components.checkbox.5umxjx1kbxg0')" allow-clear v-model="item.key">
                  </a-input>
                </a-form-item>
                <a-form-item field="text" v-if="!item.isshowsq">
                  <template #label>
                    <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                          d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                      </svg>
                    </strong>
                    <span>{{$t('components.checkbox.5umxjx1kc6c0')}}</span>
                  </template>
                  <a-input :placeholder="$t('components.checkbox.5umxjx1kca80')" allow-clear v-model="item.text['zh-CN']">
                  </a-input>
                </a-form-item>
                <a-form-item field="text" v-if="!item.isshowsq">
                  <template #label>
                    <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                          d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                      </svg>
                    </strong>
                    <span>{{$t('components.checkbox.5umxjx1kcf40')}}</span>
                  </template>
                  <a-input :placeholder="$t('components.checkbox.5umxjx1kcjs0')" allow-clear v-model="item.text['tc']">
                  </a-input>
                </a-form-item>
                <a-form-item field="text" :label="$t('components.checkbox.5umxjx1kcnw0')" v-if="!item.isshowsq">
                  <template #label>
                    <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                          d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                      </svg>
                    </strong>
                    <span>{{$t('components.checkbox.5umxjx1kcnw0')}}</span>
                  </template>
                  <a-input :placeholder="$t('components.checkbox.5umxjx1kcso0')" allow-clear v-model="item.text['en']">
                  </a-input>
                </a-form-item>
                <div style="display: flex;justify-content: space-between;">
                  <div>
                    <a-radio v-model="item.isshowxz">{{$t('components.checkbox.5umxjx1kd040')}}</a-radio>
                  </div>
                  <div v-if="!item.isshowsq" @click="item.isshowsq = !item.isshowsq" style="cursor: pointer;">
                    {{$t('components.checkbox.5umxjx1kd5c0')}}
                  </div>
                  <div v-if="item.isshowsq" @click="item.isshowsq = !item.isshowsq" style="cursor: pointer;">
                    {{$t('components.checkbox.5umxjx1kd9w0')}}
                  </div>
                </div>
              </a-col>
            </div>
          </VueDraggableNext>
        </div>
      </a-row>
    </a-card>
  </div>
</template>
  
<script setup lang='ts'>
import { ref } from "vue"
import { VueDraggableNext } from 'vue-draggable-next';
const { t } = useI18n();
const props = defineProps({
  config: {
    type: Object,
    default() {
      return {};
    },
  }
});
const config: any = ref(props.config)
const add = () => {
  config.value.options.push({
    "key": "",
    "text": {
      "zh-CN": "",
      "tc": "",
      "en": "",
      "isshowsq": false,
      "isshowxz": false
    }
  },)
}
const handleRemove = (key: any) => {
  config.value.options = config.value.options.filter((tag: any) => tag !== key);
};
const Topping = (val: any) => {
  moveObjectToTop(val)
}
const moveObjectToTop = (objectToTop: any) => {
  const index = config.value.options.indexOf(objectToTop);
  if (index > -1) {
    config.value.options.splice(index, 1); // 从原来位置删除对象
    config.value.options.unshift(objectToTop); // 将对象添加到数组开头
  }
}
const inputChange = (value: string, name: string) => {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  const zmchineseRegex = /[a-zA-Z]/;
  const regex = /^[1-9]\d*$/;
  if (chineseRegex.test(value)) {
    Message.info({ content: t('components.checkbox.5umxjx1kdew0') })
    config.value[name] = '0'
    return
  }
  if (zmchineseRegex.test(value)) {
    Message.info({ content: t('components.checkbox.5umxjx1kdio0') })
    config.value[name] = '0'
    return
  }
  if (Number(value) < 0) {
    Message.info({ content: t('components.checkbox.5umxjx1kdn00') })
    config.value[name] = '0'
    return
  }
  if (!regex.test(config.value.precision)) {
    Message.info({ content: t('components.checkbox.5umxjx1kdr00') })
    config.value[name] = '0'
    return
  }
}
</script>
  
<style lang="less" scoped>
.checkbox {
  width: 100%;

  .listStyle {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-text-2)
  }

  .listStyle:last-child {
    border-bottom: 0px;
  }
}
</style>
  