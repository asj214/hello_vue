import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCommentDots, faHeart } from "@fortawesome/free-solid-svg-icons";
// import { faCommentDots, faHeart } from "@fortawesome/free-regular-svg-icons";

library.add(faCommentDots, faHeart);
// library.add(faCommentDots, faHeart);

Vue.component("font-awesome-icon", FontAwesomeIcon);