<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination pagination-primary">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="$emit('pageEvent', pagination.current_page - 1)" >
            <span aria-hidden="true"><i class="bi bi-chevron-left"></i></span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
          :class="{'active': pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="$emit('pageEvent', page)">
            {{ page }}
          </a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="$emit('pageEvent', pagination.current_page + 1)">
            <span aria-hidden="true"><i class="bi bi-chevron-right"></i></span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PaginationView',
  props: {
    pagination: Object,
  },
};
</script>
