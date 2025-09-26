<script setup lang="ts">
import MyTable from "../components/table/MyTable.vue";
import MyTableCell from "../components/table/MyTableCell.vue";

const tableData = [
  {
    name: "Влад",
    surname: "Мелехин",
    email: "vmell@yandex.ru",
    token: "qjlqwkejlqwkjelqkwjelqwkjelqwkjelqkwejlqkwjelqkwjelkqwje123123123",
  },
  {
    name: "Влад",
    surname: "Мелехин",
    email: "vmell@yandex.ru",
    token: "qjlqwkejlqwkjelqkwjelqwkjelqwkjelqkwejlqkwjelqkwjelkqwje123123123",
  },
  {
    name: "Влад",
    surname: "Мелехин",
    email: "vmell@yandex.ru",
    token: "qjlqwkejlqwkjelqkwjelqwkjelqwkjelqkwejlqkwjelqkwjelkqwje123123123",
  },
  {
    name: "Влад",
    surname: "Мелехинмемелехин",
    email: "vmell@yandex.ru",
    token: "qjlqwkejlqwkjelqkwjelqwkjelqwkjelqkwejlqkwjelqkwjelkqwje123123123",
  },
];
</script>

<template>
  <div style="width: 100%; overflow-x: auto">
    <MyTable style="border: 1px solid darkgray">
      <template #head>
        <tr>
          <MyTableCell type="head">Имя</MyTableCell>
          <MyTableCell type="head">Фамилия</MyTableCell>
          <MyTableCell type="head">Почта</MyTableCell>
          <MyTableCell type="head">Токен</MyTableCell>
        </tr>
      </template>
      <template #body>
        <tr v-for="item in tableData">
          <MyTableCell>{{ item.name }}</MyTableCell>
          <MyTableCell>{{ item.surname }}</MyTableCell>
          <MyTableCell>{{ item.email }}</MyTableCell>
          <MyTableCell style="word-break: break-all; min-width: 200px">
            {{ item.token }}
          </MyTableCell>
        </tr>
      </template>
    </MyTable>
  </div>
</template>

<style scoped></style>
