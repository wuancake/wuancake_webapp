<template>
    <div class="page-index">
        <h2>LAVAS</h2>
        <h4>[ˈlɑ:vəz]</h4>
        <button @click="query">fetch</button>
        <i class="iconfont">&#xe62b;</i>
        <div>
            <w-button>按钮</w-button>
        </div>
    </div>
</template>

<script>
import { getGroupList } from '../api/group.js'
import WButton from '../components/WButton'
function setState(store) {}

export default {
    name: 'index',
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },
    async asyncData({store, route}) {
        setState(store);
    },
    components: {
        WButton
    },
    data () {
        return {}
    },
    mounted() {
        this.query()
    },
    methods: {
        query () {
            getGroupList().then(res => {
                console.log(res)
            })
        }
    }
};
</script>

<style lang="stylus" scoped>

.page-index
    display flex
    justify-content center
    align-items center
    flex-direction column

    h2
        font-size 46px
        font-weight 500
        margin-bottom 0
</style>
