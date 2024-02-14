export function handlePending(state: { isLoading: boolean }) {
  state.isLoading = true
}

export function handleRejected(
  state: { isLoading: boolean; error: unknown },
  action: { payload: unknown }
) {
  state.isLoading = false
  state.error = action.payload
}
