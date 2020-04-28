import { format } from 'd3'

export const formatData = (number, formating) => format(formating)(number).replace('G', 'B')
