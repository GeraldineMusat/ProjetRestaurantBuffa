<template>
  <div id="app">
    <ul>
      <li>
        <a>
          <router-link to="/">Home</router-link>
        </a>
      </li>
      <li>
        <a>
          <router-link to="/restaurants">Restaurants</router-link>
        </a>
      </li>
      <li>
        <a>
          <router-link to="/add">Ajouter restaurant</router-link>
        </a>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
    };
  }
};
</script>

<style>
body {
  background-image: url("img/bg1.jpg");
  font-family: comic sans ms;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #bc8f8f;
  border-radius: 10px;
}

li {
  float: left;
  border-right: 1px solid #bbb;
}

li:last-child {
  border-right: none;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 23px;
}
</style>
