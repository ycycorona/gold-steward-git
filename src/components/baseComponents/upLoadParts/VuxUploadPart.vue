<template>
    <div class="weui-cell">
        <div class="weui-cell__bd">
            <div class="weui-uploader">
                <div v-show="showHeader" class="weui-uploader__hd">
                    <p class="weui-uploader__title"> {{ title }} </p>
                    <div v-show="showHeader && showTip" class="weui-uploader__info">
                        {{ images.length }} / {{ max }}
                    </div>
                </div>

                <div class="weui-uploader__bd" :class="{small: size === 'small'}">
                    <div v-show="!readonly && images.length > 0" class="weui-uploader__input-box remove"
                         @click="remove">
                    </div>

                    <ul class="weui-uploader__files">
                        <uploader-item v-for="(image, index) in images" :background-image="image.url" :key="image.url"
                                       @click.native="preview(image, index)"></uploader-item>
                    </ul>

                    <div v-show="!readonly && images.length < max" class="weui-uploader__input-box" @click="add">
                        <input v-if="!handleClick" ref="input" class="weui-uploader__input" type="file"
                               accept="image/jpg,image/jpeg,image/png,image/gif" :capture="showCapture"
                               @change="change">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UploaderItem from './VuxUploadPartItem.vue'
    import axios from 'axios'
    export default {
        props: {
            images: {
                type: Array,
                default: () => []
            },
            max: {
                type: Number,
                default: 1
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            showTip: {
                type: Boolean,
                default: true
            },
            readonly: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '图片上传'
            },
            // 是否接管+号的click事件，如果是，点击不弹出选择文件的框
            handleClick: {
                type: Boolean,
                default: false
            },
            // 选择文件后是否自动上传，如果不是，则emit change事件
            autoUpload: {
                type: Boolean,
                default: true
            },
            uploadUrl: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'normal'
            },
            capture: {
                type: String,
                default: ''
            }
        },
        components: {
            UploaderItem
        },
        mounted(){
            /*this.$vux.loading.show('正在上传')*/
        },
        methods: {
            add () {
                if (this.handleClick) {
                    this.$emit('add-image')
                }
            },
            // 移除最后一张图
            remove () {
                if (this.handleClick) {
                    this.$emit('remove-image')
                } else {
                    this.images.pop();
                    this.$store.state.picContainer.pop();
                }
            },
            preview (image, index) {
                // 暂未实现，可以捕捉preview事件自己实现
                this.$emit('preview', image, index)
            },
            // 适用于action的情况, 上传到vuex,等待最终上传到服务器
            change () {
                if (this.handleClick) {
                    return
                }
                let fileObj = {
                    index: 'imgs[' + this.images.length + ']',
                    name: this.$refs.input.value,
                    file: this.$refs.input.files[0],
                };
                if (this.autoUpload) {
                    if (!this.uploadUrl) {
                        console.error('uploadUrl不应为空')
                    }
                    console.log('开始上传到vuex');
                    this.$store.commit('pushPic', fileObj);
                    this.$refs.input.value = '';
                    /*this.images.push(fileObj.name);*/
                    this.showSmallPreview(fileObj.file)
/*                    axios.post(this.uploadUrl, formData)
                        .then((response) => {
                            if (this.$vux && this.$vux.loading) {
                                this.$vux.loading.hide()
                            }
                            this.$refs.input.value = ''
                            this.images.push(response.data.data)
                        })
                        /!*开发测试用*!/
                        .catch((error) => {
                            console.log(error);
                            this.images.push({url: 'picUrl'}); //后台要返回图片上传后的地址
                            this.$vux.loading.hide();
                        });*/
                } else {
                    this.$emit('upload-image', formData)
                }
            },
            /**
             * @desc 把前端本地图片资源转变成url字符串
             * @param file 图片对象
             *
             **/
            showSmallPreview (file){
                let oFile = file;
                let oFReader = new FileReader();
                let rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                if (!rFilter.test(oFile.type)) { return; }
                oFReader.readAsDataURL(oFile);
                oFReader.onload = (oFREvent) => {
                    this.images.push({
                        url: oFREvent.target.result
                    });
                };
            }
        },
        computed: {
            showCapture () {
                return this.capture || undefined
            }
        }
    }
</script>
<style scoped lang="less">
    @import '~vux/src/styles/weui/widget/weui-uploader/index.less';

    .remove:before {
        width: 0;
        height: 0;
    }

    .weui-uploader__bd.small {
        .weui-uploader__input-box {
            margin-right: 5px;
            margin-bottom: 5px;
            width: 58px;
            height: 58px;
        }
        .weui-uploader__file {
            width: 60px;
            height: 60px;
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }
</style>
