<template>
    <div>
        <VuxUploadPart
            :max="maxImgsNum"
            :images="images"
            :handle-click="false"
            :show-header="true"
            :readonly="false"
            :upload-url="uploadUrl"
            size="small"
            :autoUpload="true"
            title="上传照片"
            @preview="show"
        ></VuxUploadPart>
        <Previewer :list="previewImages" ref="previewer"></Previewer>
    </div>
</template>

<script>
    import { Group, Cell, Previewer } from 'vux'
    import VuxUploadPart from './upLoadParts/VuxUploadPart.vue'
    export default {
        name: 'UpLoadFile',
        components: {
            Group,
            Cell, VuxUploadPart, Previewer
        },
        data () {
            return {
                basePath: global.basePath,
                msg: 'Hello World!',
                maxImgsNum: 3,
                images: [
                    /*{url: basePath + "/mobile_src/imgs/upload/878619173.jpeg"},
                    {url: basePath + "/mobile_src/imgs/upload/884334763.jpeg"},
                    {url: basePath + "/mobile_src/imgs/upload/1491322234.jpeg"},*/
                ],
                uploadUrl: "www.baidu.com"
            }
        },
        computed: {
            previewImages(){
                let returnArry = [];
                this.images.forEach(function (val, index, arry) {
                    returnArry.push({
                        src: val.url
                    });
                });
                return returnArry;
            }
        },
        methods: {
            onChange(e){
                let formData = new FormData();
                formData.append('file', e.currentTarget.files[0]);
                console.log(formData);
                this.$http.post('/preFlightApi/PreFlight/personal/flightPlanList.do', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((response) => {
                    console.log("获取航班动态数据：", response.data);
                    /*this.processData(response.data);*/
                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            show (image, index) {
                console.log(image, index)
                this.$refs.previewer.show(index)
            }
        }
    }
</script>

<style>

</style>
