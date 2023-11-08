<template>
  <div class="radio">
    <a-card>
      <template #title>
        <div style="display: flex;justify-content: space-between;">
          <div>
            {{ $t('components.radio.5umxlx7q0j80') }}
          </div>
          <div>
            <a-button type="primary" @click="add">
              <template #icon>
                <icon-plus />
              </template>
              {{$t('components.radio.5umxlx7q13g0')}}
            </a-button>
          </div>
        </div>
      </template>
      <a-row :gutter="16">
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
                <div style="width: 30px;text-align: right;color: rgb(247, 105, 101);cursor: pointer;" @click="handleRemove(item)">
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
                  <span>{{$t('components.radio.5umxlx7q1bk0')}}</span>
                </template>
                <a-input :placeholder="$t('components.radio.5umxlx7q1h00')" allow-clear v-model="item.key">
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
                  <span>{{$t('components.radio.5umxlx7q1o00')}}</span>
                </template>
                <a-input :placeholder="$t('components.radio.5umxlx7q1tc0')" allow-clear v-model="item.text['zh-CN']">
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
                  <span>{{$t('components.radio.5umxlx7q1zk0')}}</span>
                </template>
                <a-input :placeholder="$t('components.radio.5umxlx7q24o0')" allow-clear v-model="item.text['tc']">
                </a-input>
              </a-form-item>
              <a-form-item field="text" :label="$t('components.radio.5umxlx7q2a00')" v-if="!item.isshowsq">
                <template #label>
                  <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                      width="1em" height="1em">
                      <path
                        d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                      </path>
                    </svg>
                  </strong>
                  <span>{{$t('components.radio.5umxlx7q2a00')}}</span>
                </template>
                <a-input :placeholder="$t('components.radio.5umxlx7q2fc0')" allow-clear v-model="item.text['en']">
                </a-input>
              </a-form-item>
              <div style="display: flex;justify-content: space-between;">
                <div>
                  <a-checkbox  v-model="item.isshowxz" @change="changeRadio($event,item)">{{$t('components.radio.5umxlx7q2mg0')}}</a-checkbox>
                </div>
                <div v-if="!item.isshowsq" @click="item.isshowsq = !item.isshowsq" style="cursor: pointer;">
                  {{$t('components.radio.5umxlx7q2rw0')}}
                </div>
                <div v-if="item.isshowsq" @click="item.isshowsq = !item.isshowsq" style="cursor: pointer;">
                  {{$t('components.radio.5umxlx7q2xc0')}}
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
                    <span>{{$t('components.radio.5umxlx7q1bk0')}}</span>
                  </template>
                  <a-input :placeholder="$t('components.radio.5umxlx7q1h00')" allow-clear v-model="item.key">
                  </a-input>
                </a-form-item>
                <a-form-item field="text">
                  <template #label>
                    <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                          d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                      </svg>
                    </strong>
                    <span>{{$t('components.radio.5umxlx7q1o00')}}</span>
                  </template>
                  <a-input :placeholder="$t('components.radio.5umxlx7q1tc0')" allow-clear v-model="item.text['zh-CN']">
                  </a-input>
                </a-form-item>
                <a-form-item field="text">
                  <template #label>
                    <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                          d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                      </svg>
                    </strong>
                    <span>{{$t('components.radio.5umxlx7q1zk0')}}</span>
                  </template>
                  <a-input :placeholder="$t('components.radio.5umxlx7q24o0')" allow-clear v-model="item.text['tc']">
                  </a-input>
                </a-form-item>
                <a-form-item field="text" :label="$t('components.radio.5umxlx7q2a00')">
                  <template #label>
                    <strong class="arco-form-item-label-required-symbol"><svg fill="currentColor" viewBox="0 0 1024 1024"
                        width="1em" height="1em">
                        <path
                          d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                        </path>
                      </svg>
                    </strong>
                    <span>{{$t('components.radio.5umxlx7q2a00')}}</span>
                  </template>
                  <a-input :placeholder="$t('components.radio.5umxlx7q2fc0')" allow-clear v-model="item.text['en']">
                  </a-input>
                </a-form-item>
                <div style="display: flex;justify-content: space-between;">
                  <div>
                    <a-checkbox  v-model="item.isshowxz" @change="changeRadio($event,item)">{{$t('components.radio.5umxlx7q2mg0')}}</a-checkbox>
                  </div>
                  <div v-if="!item.isshowsq" @click="item.isshowsq = !item.isshowsq" style="cursor: pointer;">
                    {{$t('components.radio.5umxlx7q2rw0')}}
                  </div>
                  <div v-if="item.isshowsq" @click="item.isshowsq = !item.isshowsq" style="cursor: pointer;">
                    {{$t('components.radio.5umxlx7q2xc0')}}
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
    },
    "isshowsq": false,
    "isshowxz": false
  })
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
const changeRadio = (val:any,item:any) =>{
    
    let arr = config.value.options.filter((item:any)=> item.isshowxz)
    item.isshowxz = val
    if (arr.length > 1) {
      item.isshowxz = false
      Message.info({ content: t('components.radio.5umxlx7q32o0') })
      return
    }
}
</script>
  
<style lang="less" scoped>
.radio {
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
  