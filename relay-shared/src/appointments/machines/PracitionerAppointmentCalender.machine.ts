import { createMachine } from '@mtyk/machine'

import { add, startOfMonth } from 'date-fns'
import { omit } from 'lodash'
import newId from '../../core/helpers/newId'
import machineReducer from '../../machines/helpers/machineReducer'
import { IRelayAppointment } from '../types/IRelayAppointment'

export type UIAppointmentEdit = {
  time: Date
  repeat?: string
}

const machine = createMachine({
  init: async (opts: {
    selectedDate: Date
    selectedEventId?: string
    editingAppointment?: IRelayAppointment
    newAppointment?: boolean
    edit: UIAppointmentEdit
  }) => {
    const month = startOfMonth(opts.selectedDate)
    return {
      month,
      ...opts,
    }
  },
  addAppointment: machineReducer((ctx, _) => ({
    ...ctx,
    editingAppointment: {
      _id: newId(),
      date: add(ctx.selectedDate, { hours: 15 }),
    },
    selectedEventId: null,
    newAppointment: true,
  })),
  selectDate: machineReducer((ctx, selectedDate: Date) => ({
    ...ctx,
    selectedDate,
  })),
  updateEdit: machineReducer((ctx, update: Partial<IRelayAppointment>) => ({
    ...ctx,
    editingAppointment: { ...ctx.editingAppointment, ...update },
  })),
  selectAppointment: machineReducer((ctx, appointment: IRelayAppointment) => ({
    ...ctx,
    editingAppointment: appointment,
    selectedEventId: appointment?._id,
    newAppointment: false,
  })),
  finishEditing: async (_, handle: any) => {
    return {
      ...handle.currentState.context,
      selectedEventId: null,
      newAppointment: null,
      editingAppointment: null,
    }
  },
  cancelAddAppointment: machineReducer((ctx) => omit(ctx, 'newAppointment')),
})

export default machine
