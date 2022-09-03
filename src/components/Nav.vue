<template>
  <nav class="navbar navbar-expand-md mb-4 mt-4 top-navbar">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">User Management</router-link>

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link active">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Daftar</router-link>
          </li>
        </ul>

        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
          <li class="nav-item">
            <div class="dropdown">
              <span>{{ user.username }}</span>
              <button
                id="top-dropdown"
                class="btn btn-custom"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="user">
                  <div class="avatar">
                    <img
                      class=""
                      v-bind:src="avatar.data"
                      alt="avatarImg"
                      height="40"
                      width="40"
                    /><span class="avatar-status-online"></span>
                  </div>
                </div>
              </button>
              <ul id="dropdown-menu" class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" @click="logout">Logout</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Modal -->
  <div
    class="modal fade"
    id="loadingNav"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="loadingNavLabel"
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
        <div class="modal-body center">Logout Gagal</div>
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
import { computed } from "vue";
import { useStore } from "vuex";
import avatar from "../assets/avatar";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";

export default {
  name: "app",
  setup() {
    const store = useStore();

    const auth = computed(() => store.state.authenticated);
    const user = computed(() => store.state.user);
    const router = useRouter();

    const closeDropDown = () => {
      // SET CLASS CONTAINER DROPDOWN TO CLOSE
      document.getElementById("top-dropdown")?.classList.remove("show");
      document
        .getElementById("top-dropdown")
        ?.setAttribute("aria-expanded", "false");

      // SET CLASS DROPDOWN MENU TO CLOSE
      document.getElementById("dropdown-menu")?.classList.remove("show");
      document
        .getElementById("dropdown-menu")
        ?.classList.remove("open-dropdown");
    };

    const openFailed = () => {
      const myModal = new Modal(document.getElementById("failedModal"), {});
      myModal.show();
    };

    const logout = async () => {
      const _fetch = await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const response = await _fetch.json();

      if (response.status === 200 && response.message === "Logout sukses") {
        await store.dispatch("setAuth", false);
        await router.push("/login");
      } else {
        openFailed();
      }
      closeDropDown();
    };

    const openDropdown = () => {
      // GET STATUS DROPDOWN. IS OPEN OR CLOSE
      const status = document.getElementById("top-dropdown")?.ariaExpanded;

      if (status === "false") {
        // SET CLASS CONTAINER DROPDOWN TO OPEN
        document.getElementById("top-dropdown")?.classList.add("show");
        document
          .getElementById("top-dropdown")
          ?.setAttribute("aria-expanded", "true");

        // SET CLASS DROPDOWN MENU TO OPEN
        document.getElementById("dropdown-menu")?.classList.add("show");
        document
          .getElementById("dropdown-menu")
          ?.classList.add("open-dropdown");
      } else {
        closeDropDown();
      }
    };

    return {
      auth,
      user,
      logout,
      avatar,
      openDropdown,
    };
  },
};
</script>

<style>
.top-navbar {
  min-width: 55em;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  padding: 0.5em;
}
.user {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.avatar {
  white-space: nowrap;
  position: relative;
  color: #fff;
  display: inline-flex;
  font-size: 1rem;
  vertical-align: middle;
  font-weight: 600;
}
.avatar img {
  background-color: #c3c3c3;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
}
.avatar-status-online {
  background-color: #28c76f;
  width: 11px;
  height: 11px;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  border: 1px solid #fff;
}
.btn-custom {
  border: none;
}
</style>