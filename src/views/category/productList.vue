<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <van-icon name="arrow-left" @click="goBack" />
        <div class="header-search">
          <van-icon name="search" />
          <input
            type="text"
            class="search-title"
            @mouseenter="textEnter"
            @mouseleave="textLeave"
            v-model="keyword"
          />
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#1baeae" @click="changeTab">
        <van-tab
          :title="item.title"
          :name="item.name"
          v-for="(item, index) in tabsList"
          :key="index"
        ></van-tab>
      </van-tabs>
      <!-- pull-refresh 下拉刷新 -->
      <!-- van-list 滑倒底部加载 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="product-list-refresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="product-item"
            v-for="(item, index) in productList"
            :key="index"
            @click="productDetail(item)"
          >
            <img :src="prefix(item.goodsCoverImg)" />
            <div class="product-info">
              <p class="name">{{ item.goodsName }}</p>
              <p class="subtitle">{{ item.goodsIntro }}</p>
              <span class="price">￥ {{ item.sellingPrice }}</span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { productList } from "../../json/good";

const router = useRouter();
const tabsList = reactive([
  { title: "推荐", name: "" },
  { title: "新品", name: "new" },
  { title: "价格", name: "price" },
]);
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(true);

const goBack = () => {
  router.go(-1);
};
const changeTab = () => {};
const onRefresh = () => {
  setTimeout(() => {
    showToast("刷新成功");
    refreshing.value = false;
  }, 1000);
};
const productDetail = () => {};
</script>
<style lang="less" scoped>
.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .category-header {
    .fj();
    align-items: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      align-items: center;
      width: 76%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #f7f7f7;
      .borderRadius(20px);
      .nbSearch {
        padding: 0 5px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        background: #f7f7f7;
      }
    }
    .icon-More {
      font-size: 20px;
    }
    .search-btn {
      height: 28px;
      margin: 8px 0;
      line-height: 28px;
      padding: 0 5px;
      color: #fff;
      background: @primary;
      .borderRadius(5px);
      margin-top: 10px;
    }
  }
}
.product-list-refresh {
  margin-top: 78px;
  .product-item {
    .fj();
    width: 100%;
    height: 120px;
    padding: 10px 0;
    border-bottom: 1px solid #dcdcdc;
    img {
      width: 140px;
      height: 120px;
      padding: 0 10px;
      .boxSizing();
    }
    .product-info {
      width: 56%;
      height: 120px;
      padding: 5px;
      text-align: left;
      .boxSizing();
      p {
        margin: 0;
      }
      .name {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        width: 100%;
        max-height: 20px;
        padding: 10px 0;
        line-height: 25px;
        font-size: 13px;
        color: #999;
        overflow: hidden;
      }
      .price {
        color: @primary;
        font-size: 16px;
      }
    }
  }
}
</style>