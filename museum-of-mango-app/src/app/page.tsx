/**
 * Museum of Mango — Entry page
 * Source: Slice 05D specification (Architecture Lock)
 *
 * Structure (permanent):
 *   MuseumShell
 *     └── MuseumSurface
 *             └── MuseumContainer
 *                     └── MuseumEngine
 *
 * page.tsx contains exactly this five-element structure
 * and nothing else.
 *
 * page.tsx does NOT:
 *   - load JSON
 *   - create maps
 *   - create ViewModels
 *   - resolve data
 *   - own runtime
 *   - own navigation
 *
 * All data preparation is owned by MuseumEngine internally.
 */

import { MuseumShell } from "@/components/base/MuseumShell";
import { MuseumSurface } from "@/components/layout/MuseumSurface";
import { MuseumContainer } from "@/components/layout/MuseumContainer";
import { MuseumEngine } from "@/components/engine/MuseumEngine";

export default function Page() {
  return (
    <MuseumShell>
      <MuseumSurface className="flex flex-col justify-center">
        <MuseumContainer>
          <MuseumEngine />
        </MuseumContainer>
      </MuseumSurface>
    </MuseumShell>
  );
}
