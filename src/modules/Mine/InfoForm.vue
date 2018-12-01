<template>
    <el-form ref="info" :model="form" label-width="80px">
        <div class="col">
            <div class="left">
                <el-form-item :label="$t('label.name')">
                    <el-input v-model="form.name" :maxlength="10" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item :label="$t('label.sex')">
                    <el-radio-group v-model="form.sex">
                        <el-radio-button label="0">{{$t('label.female')}}</el-radio-button>
                        <el-radio-button label="1">{{$t('label.male')}}</el-radio-button>
                        <el-radio-button label="2">{{$t('label.secrecy')}}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('label.area')">
                    <el-cascader
                            size="large"
                            :options="areaOptions"
                            v-model="areaSelected"
                            @change="areaChange">
                    </el-cascader>
                </el-form-item>
            </div>
            <div class="right">
                <el-form-item>
                    <el-upload class="avatar-uploader"
                               :action="action"
                               :headers="headers"
                               :show-file-list="false"
                               :on-success="avatarUploadSuccess"
                               :on-error="avatarUploadError"
                               :before-upload="avatarBeforeUpload">
                        <img v-if="avatar" :src="avatar" :err="false" class="avatar" @error="avatarOnError">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
        </div>
        <div class="col">
            <el-form-item :label="$t('label.introduction')">
                <el-input type="textarea" v-model="form.introduction" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{$t("save")}}</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
    import {CodeToText, regionData, TextToCode} from 'element-china-area-data'
    import {storage, uploadAvatarPath} from "@/api/storage";
    import {modifyInfo} from "@/api/mine";
    import {formatByte} from "@/utils";
    import {getToken} from "@/utils/auth";

    export default {
        name: "MineInfoForm",
        data() {
            return {
                action: uploadAvatarPath(),
                ext: ['jpg', 'jpeg', 'gif', 'png'],
                size: 2 * 1024 * 1024,
                avatar: storage(this.$store.state.member.avatar),
                form: {
                    name: this.$store.state.member.name,
                    avatar: this.$store.state.member.avatar,
                    sex: this.$store.state.member.sex,
                    introduction: this.$store.state.member.introduction,
                    area: this.$store.state.member.area,
                    city: this.$store.state.member.city,
                    province: this.$store.state.member.province,
                    country: '',
                },
                areaOptions: regionData,
                areaSelected: [this.$store.state.member.province, this.$store.state.member.city, this.$store.state.member.area],
                headers: {token: getToken()}
            }
        },
        methods: {
            onSubmit() {
                modifyInfo(this.form).then(res => {
                    this.$message({
                        message: res.message,
                        type: 'success',
                        duration: 5 * 1000
                    });
                    this.$store.dispatch('ChangeRoles', getToken()).then()
                })
            },
            avatarUploadSuccess(res, file) {
                if (res.code >= 20000 && res.code < 30000) {
                    this.form.avatar = res.data.url;
                    this.avatar = storage(res.data.url);
                } else {
                    this.avatarUploadError(res, file)
                }
            },
            avatarUploadError(err, file) {
                this.$message({
                    message: err.message ? err.message : err,
                    type: 'error',
                    duration: 5 * 1000
                })
            },
            avatarBeforeUpload(file) {
                const isImg = (() => {
                    let arr = file.type.split('/');
                    return arr.length === 2 && this.ext.indexOf(arr[1]) >= 0
                })();
                const isLtSize = (() => {
                    return file.size < this.size;
                })();
                if (!isImg) {
                    this.$message.error(this.$t('error.file_type', {
                        type: this.$t("label.avatar"),
                        ext: this.ext.join(',')
                    }));
                }
                if (!isLtSize) {
                    this.$message.error(this.$t('error.file_size', {
                        type: this.$t("label.avatar"),
                        size: formatByte(this.size)
                    }));
                }
                return isImg && isLtSize;
            },
            avatarOnError(e) {
                if (!e.target.err) {
                    e.target.err = true;
                    return e.target.src = storage('avatar/default.png')
                }
            },
            areaChange(val) {
                this.form.country = '86';
                this.form.province = val[0];
                this.form.city = val[1];
                this.form.area = val[2];
            }
        }
    }
</script>

<style scoped>
    .col {
        display: inline-block;
        width: 100%;
    }

    .left {
        width: 50%;
        float: left;
    }

    .right {
        width: 50%;
        float: left;
        text-align: right;
    }

</style>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>