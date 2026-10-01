# Bioenergy & Anaerobic Conversion

## Kinetic Model
Anaerobic digestion (AD) is modeled in a Continuous Stirred-Tank Reactor (CSTR) under mesophilic conditions ($37^\circ\text{C}$):

$$V_{\text{CH}_4} (\text{m}^3) = \text{Volatile Solids (kg)} \times \text{BMP} \times \eta_{\text{conversion}}$$

### Parameters by Scenario
| Scenario | BMP ($\text{m}^3\text{ CH}_4/\text{kg VS}$) | $\text{CH}_4$ Fraction in Biogas | Conversion $\eta$ | CNG Purification |
| :--- | :--- | :--- | :--- | :--- |
| **Conservative** | $0.22$ | $58\%$ | $75\%$ | $90\%$ |
| **Baseline** | $0.28$ | $62\%$ | $85\%$ | $95\%$ |
| **Optimistic** | $0.34$ | $65\%$ | $92\%$ | $97\%$ |

### Bio-CNG Compression
$$\text{Mass}_{\text{Bio-CNG}} (\text{kg}) = V_{\text{CH}_4} \times 0.717\text{ kg/m}^3 \times \text{Purity}$$

### Digestate & Vermicomposting
- **Total Digestate Mass**: $85\%$ of fresh input biomass
- **Vermicompost Cast Yield**: $45\%$ of digestate solids converted by *Eisenia foetida*
- **Liquid Vermiwash**: $120\text{ Liters / tonne digestate}$
- **NPK Bio-fertilizer Content**: $2.1\%\text{ N}, 1.4\%\text{ P}_2\text{O}_5, 1.8\%\text{ K}_2\text{O}$
