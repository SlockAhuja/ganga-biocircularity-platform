# Biomass & Proximate Quantification

## Mathematical Modeling
Fresh water hyacinth (*Eichhornia crassipes*) has very high water content (~90–93%). The platform translates satellite-detected polygon area into dry matter and volatile organic fractions:

$$\text{Fresh Biomass } (M_{\text{fresh}}\text{, tonnes}) = \text{Area (ha)} \times \left(\frac{\text{Coverage \%}}{100}\right) \times \rho_{\text{density}}$$

Where yield density $\rho_{\text{density}}$ is empirical:
- **Low Density**: $17.0\text{ t/ha}$
- **Moderate Density**: $24.0\text{ t/ha}$
- **High Density**: $32.0\text{ t/ha}$
- **Very High Density**: $35.0\text{ t/ha}$

### Proximate Fractions
- **Moisture Content**: $91.0\%$ default (configurable $85\text{--}95\%$)
- **Total Solids (TS)**: $\text{TS} = M_{\text{fresh}} \times \left(\frac{\text{TS \%}}{100}\right) = M_{\text{fresh}} \times 0.09$
- **Volatile Solids (VS)**: $\text{VS} = \text{TS} \times 0.80$
- **Ash Residue**: $20\%$ of TS
- **C:N Ratio**: $24.5$ (optimum for anaerobic microbial digestion)
