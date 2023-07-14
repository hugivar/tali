import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ServiceState {
    service: string,
    setService: (serviceName: string) => void
}

const useServiceStore = create<ServiceState>()(
    devtools(
        persist(
            (set) => ({
                service: 'todoist',
                setService: (serviceName: string) => set(() => ({ service: serviceName }))
            }),
            {
                name: 'service-storage',
            }
        )
    )
)

export default useServiceStore;