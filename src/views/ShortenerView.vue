<template>
  <div>
    <h2>Generate Short URL</h2>
    <el-form label-width="auto" style="max-width: 600px">
      <el-input v-model="url" type="textarea" placeholder="Enter original URL"/>
      <el-input v-model="slug" type="text" placeholder="Enter custom slug (optional)"/>
      <button @click="generateShortUrl">Generate</button>
    </el-form>

    <div v-if="link">
      <p>Short URL: <a :href="link" target="_blank">{{ link }}</a></p>
      <button @click="copyToClipboard">Copy to Clipboard</button>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  data() {
    return {
      url: '',
      slug: '',
      link: ''
    };
  },
  methods: {
    async generateShortUrl() {
      const body = {
        url: this.url,
        slug: this.slug
      };
      const token = localStorage.getItem('token');
      fetch('/api/generate', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(body)
      })
          .then(res => res.json())
          .then(response => {
            this.link = response.link;
          })
    },
    copyToClipboard() {
      const clipboard = new Clipboard('.btn');
      clipboard.on('success', function (e) {
        alert('Copied to clipboard!');
        e.clearSelection();
      });
    }
  }
};
</script>
