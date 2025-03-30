<template>
    <div
        :class="[
            'py-2 px-6 rounded rounded-xl border relative flex mt-2',
            isCheck ? 'border-green-500' : 'border-gray-500'
        ]"
    >
        <h1 class="text-gray-500 text-2xl font-semibold">{{ label }}</h1>
        <div 
            @click="handleClick"
            :class="[
                'w-14 h-6 absolute right-10 top-1/2 cursor-pointer transform translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-in-out',
                isCheck ? 'border-green-500 bg-green-500' : 'border-gray-500 bg-gray-500'
            ]"
        >
        </div>
        <div
            @click="handleClick"
            :class="[
                'absolute top-1/2 right-10 cursor-pointer transform -translate-y-1/2 bg-white w-9 h-6 rounded-full shadow-md transition-all duration-300 ease-in-out',
                isCheck ? 'translate-x-7' : 'translate-x-2'
            ]"
        >
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'CheckBox',
        emits: ['update:isCheck'],
        props: {
            isCheck: {
                type: Boolean,
                default: false
            },
            value: {
                type: null,
            },
            label: {
                type: String,
                default: ""
            }
        },
        setup(props, { emit }) {
            const handleClick = () => {
                emit('update:isCheck', props.value);
            }
            return {
                handleClick
            }
        }
    })
</script>