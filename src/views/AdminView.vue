<template>
  <div>
    <h2>Short URL Management</h2>
    <el-table :data="links" style="width: 100%">
      <el-table-column label="slug" width="180">
        <template #default="scope">
          <el-link :href="scope.row.shortUrl" target="_blank" type="primary">{{ scope.row.slug }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="originalUrl" label="originalUrl" show-overflow-tooltip="true" width="600" />
      <el-table-column prop="createdAt" label="createdAt" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="deleteLink(scope.row.id)">
            Detail
          </el-button>
          <el-button link type="primary" size="small" @click="editLink(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: []
    };
  },
  mounted() {
    this.fetchLinks();
  },
  methods: {
    async fetchLinks() {
      const token = localStorage.getItem('token')
      fetch('/api/links', {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'Authorization': token
        }
      })
          .then(res => res.json())
          .then(response => {
            console.log(response)
            this.links = response;
          })
    },
    async deleteLink(id) {
      const token = localStorage.getItem('token')
      await fetch(`/api/links/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'Authorization': token
        }
      });
      await this.fetchLinks();
    },
    editLink(link) {
      const token = localStorage.getItem('token')
      // 可以打开模态框编辑
      alert(`Editing ${link.slug}`, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'Authorization': token
        }
      });
    }
  }
};
</script>
