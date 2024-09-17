import React, { useEffect, useState, ComponentProps } from 'react'
import { Worksheet } from '../../RelayTypes'

export default function getWorksheetName(worksheet: Worksheet) {
  return worksheet.name
}
