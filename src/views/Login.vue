<template>
  <div class="flex-center">
    <form class="form-input" @submit.prevent="submit">
      <h1 class="h3 mb-4 fw-normal">Form Login</h1>

      <div class="form-floating gap">
        <input
          v-model="data.email"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email</label>
      </div>
      <div class="form-floating gap">
        <input
          v-model="data.password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn-lg primary cust-btn" type="submit">
        Sign in
      </button>
      <Footer />
    </form>
  </div>

  <!-- Modal Loading -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span style="font-size: 1.5em">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Message -->
  <div
    class="modal fade"
    id="messageModal"
    tabindex="-1"
    aria-labelledby="messageModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="messageModalLabel">Informasi</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body center">Login Gagal</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Modal } from "bootstrap";

export default {
  name: "app",
  components: { Footer },
  setup() {
    const data = reactive({
      email: "",
      password: "",
    });

    const router = useRouter();
    const store = useStore();
    let message = "";

    const openMessage = () => {
      const myModal = new Modal(document.getElementById("messageModal"), {});
      myModal.show();
    };

    const submit = async () => {
      const myModal = new Modal(document.getElementById("staticBackdrop"), {});
      myModal.show();

      const _fetch = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      setTimeout(async () => {
        myModal.hide();
        const response = await _fetch.json();

        if (response.status === 200 && response.message === "Sukses") {
          await store.dispatch("setAuth", true);
          await router.push("/");
        } else {
          console.log("error");
          openMessage();
        }
      }, 1000);
    };

    return {
      data,
      submit,
      message,
    };
  },
};
</script>

<style>
.form-input {
  width: 30em;
}
.gap {
  margin-bottom: 1em;
}
</style>