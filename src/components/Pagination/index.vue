<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('turnPage', pageNo - 1)">
      上一页
    </button>
    <button v-if="startEnd.start > 1"   @click="$emit('turnPage', 1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <button
      v-for="page in startEnd.end"
      v-if="page >= startEnd.start"
      :key="page"
      :class="{ active: page === pageNo }"
      @click="$emit('turnPage', page)"
    >
      {{ page }}
    </button>

    <button v-if="startEnd.end < totalPages - 1">···</button>
    <button
      v-if="startEnd.end < totalPages"
      @click="$emit('turnPage', totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="pageNo === totalPages"
      @click="$emit('turnPage', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ totalPages }} 页</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageNo: Number,
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    continuousNum: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续数,开始,结束数字
    startEnd() {
      let start = 0;
      let end = 0;
      let { continuousNum, totalPages, pageNo } = this;
      //传过来的连续数比总页数多 ,这样很简答让sart = 1 ,end = totalPages 说明我可以全部展示所有的商品
      if (continuousNum > totalPages) {
        start = 1;
        end = totalPages;
      } else {
        //正常情况
        start = pageNo - Math.floor(continuousNum / 2);
        end = pageNo + Math.floor(continuousNum / 2);
        if (start < 0) {
          start = 1;
          end = continuousNum;
        }
        if (end > totalPages) {
          end = totalPages;
          start = totalPages - continuousNum + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
