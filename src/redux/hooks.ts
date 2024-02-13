import { TypedUseSelectorHook, useDispatch } from "react-redux"
import { IAppDispatch, IRootState } from "./store"
import { useSelector } from "react-redux"

export const useAppDispatch: () => IAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
