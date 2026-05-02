import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { GripVertical, Clock } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext'
import { DELIVERY_QUEUE_ITEMS } from '../../data/sample'

const COLUMNS = ['in_progress', 'in_review', 'ready_to_deliver', 'delivered']

const COL_STYLES = {
  in_progress:      { title: 'delivery.col.in_progress',      dot: '#60a5fa' },
  in_review:        { title: 'delivery.col.in_review',        dot: '#fbbf24' },
  ready_to_deliver: { title: 'delivery.col.ready_to_deliver', dot: '#fb923c' },
  delivered:        { title: 'delivery.col.delivered',        dot: '#22c55e' },
}

function reorder(items, src, dst) {
  const result = [...items]
  const [removed] = result.splice(src, 1)
  result.splice(dst, 0, removed)
  return result
}

export default function DeliveryQueue() {
  const { t, tr } = useI18n()
  const [items, setItems] = useState(DELIVERY_QUEUE_ITEMS)

  const byColumn = COLUMNS.reduce((acc, col) => {
    acc[col] = items.filter((i) => i.column === col)
    return acc
  }, {})

  function onDragEnd({ source, destination, draggableId }) {
    if (!destination) return
    const srcCol = source.droppableId
    const dstCol = destination.droppableId

    if (srcCol === dstCol) {
      const colItems = reorder(byColumn[srcCol], source.index, destination.index)
      setItems((prev) => [
        ...prev.filter((i) => i.column !== srcCol),
        ...colItems,
      ])
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.id === draggableId ? { ...i, column: dstCol, updatedAt: new Date().toISOString() } : i
        )
      )
    }
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-white">{t('delivery.title')}</h1>
        <p className="mt-0.5 text-sm text-[#8a93a6]">{t('delivery.subtitle')}</p>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="space-y-4">
          {COLUMNS.map((col) => {
            const style = COL_STYLES[col]
            const colItems = byColumn[col]
            return (
              <section key={col}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: style.dot }}
                  />
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-[#8a93a6]">
                    {t(style.title)}
                  </h2>
                  <span className="ml-1 rounded-full bg-[#1d2230] px-2 py-0.5 text-xs font-bold text-[#8a93a6]">
                    {colItems.length}
                  </span>
                </div>
                <Droppable droppableId={col}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[60px] space-y-2 rounded-xl transition-colors"
                      style={{
                        backgroundColor: snapshot.isDraggingOver ? 'rgba(255,255,255,0.03)' : 'transparent',
                      }}
                    >
                      {colItems.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(drag, snap) => (
                            <div
                              ref={drag.innerRef}
                              {...drag.draggableProps}
                              className="rounded-xl border border-[#262c3a] bg-[#161a23] p-3"
                              style={{
                                ...drag.draggableProps.style,
                                opacity: snap.isDragging ? 0.85 : 1,
                                boxShadow: snap.isDragging ? '0 8px 24px rgba(0,0,0,0.4)' : undefined,
                              }}
                            >
                              <div className="flex items-start gap-2">
                                <span
                                  {...drag.dragHandleProps}
                                  className="mt-0.5 shrink-0 text-[#8a93a6]"
                                >
                                  <GripVertical className="h-4 w-4" />
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-xs font-mono text-[#8a93a6]">{item.taskId}</span>
                                    {item.priority === 'urgent' && (
                                      <span className="rounded border border-[#f97316]/40 bg-[#f97316]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#f97316]">
                                        {t('assign.urgent')}
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-0.5 text-sm font-semibold text-white">
                                    {tr(item, 'title')}
                                  </p>
                                  <div className="mt-1 flex items-center gap-2 text-xs text-[#8a93a6]">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1d2230] text-[10px] font-bold">
                                      {item.technicianInitials}
                                    </span>
                                    {item.zone}
                                    <Clock className="ml-auto h-3 w-3" />
                                    {item.updatedAt.slice(11, 16)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </section>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}
