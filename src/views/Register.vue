<template>
  <div class="flex-center">
    <form @submit.prevent="submit" style="width: 40em">
      <div class="container">
        <div class="row" style="width: 100%">
          <div class="col-12">
            <h1 class="h3 mb-4 fw-normal">Form Daftar</h1>
          </div>
          <div class="col-7">
            <div class="form-floating gap">
              <input
                v-model="data.username"
                type="text"
                class="form-control"
                placeholder="Nama Lengkap"
              />
              <label for="floatingInput">Nama Lengkap</label>
            </div>
          </div>
          <div class="col-7">
            <div class="form-floating gap">
              <input
                v-model="data.email"
                type="email"
                class="form-control"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email</label>
            </div>
          </div>

          <div class="col-5" style="padding-bottom: 1em">
            <select
              v-model="data.gender"
              class="form-select form-select-md"
              style="height: 100%"
            >
              <option selected>Jenis Kelamin</option>
              <option value="Laki - Laki">Laki - Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div class="col-7">
            <div class="form-floating gap">
              <input
                v-model="data.password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
          </div>

          <div class="col-5">
            <div class="form-floating gap">
              <input
                v-model="data.phone"
                type="text"
                class="form-control"
                placeholder="No Handphone"
              />
              <label for="floatingInput">No Handphone</label>
            </div>
          </div>

          <div class="col-12">
            <div class="form-floating gap">
              <textarea
                v-model="data.address"
                type="text"
                class="form-control"
                placeholder="Alamat"
                style="min-height: 6em"
              />
              <label for="floatingInput">Alamat</label>
            </div>
          </div>

          <div class="col-4">
            <button class="w-100 btn-lg primary cust-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>

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

  <!-- Modal Sukses -->
  <div
    class="modal fade"
    id="successModal"
    tabindex="-1"
    aria-labelledby="successModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="successModalLabel">Informasi</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body center">Update Data Sukses</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn primary"
            data-bs-dismiss="modal"
            @click="nextLogin"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Gagal -->
  <div
    class="modal fade"
    id="failedModal"
    tabindex="-1"
    aria-labelledby="failedModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="failedModalLabel">Informasi</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body center">Update Data Gagal</div>
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
import { Modal } from "bootstrap";

export default {
  name: "app",
  components: { Footer },
  setup() {
    const data = reactive({
      username: "",
      email: "",
      password: "",
      gender: "Jenis Kelamin",
      phone: "",
      address: "",
    });

    const router = useRouter();

    const openSuccess = () => {
      const myModal = new Modal(document.getElementById("successModal"), {});
      myModal.show();
    };

    const openFailed = () => {
      const myModal = new Modal(document.getElementById("failedModal"), {});
      myModal.show();
    };

    const submit = async () => {
      let postData = data;
      let jeniskelamin = postData.gender;

      if (
        postData.username === "" ||
        postData.email === "" ||
        postData.password === ""
      ) {
        return alert("Data Belum Lengkap!!!");
      }

      if (jeniskelamin === "Jenis Kelamin") {
        jeniskelamin = null;
      }

      postData.gender = jeniskelamin;

      const myModal = new Modal(document.getElementById("staticBackdrop"), {});
      myModal.show();

      const _fetch = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      setTimeout(async () => {
        myModal.hide();
        const response = await _fetch.json();

        if (
          response.status === 201 &&
          response.message === "Registrasi Sukses"
        ) {
          openSuccess();
        } else {
          openFailed();
        }
      }, 1000);
    };

    const nextLogin = async () => {
      await router.push("/login");
    };

    return {
      data,
      submit,
      nextLogin,
    };
  },
};
</script>