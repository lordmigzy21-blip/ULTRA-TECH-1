'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { getProducts, getSales, saveSale, Product, Sale } from '@/lib/db';

type Toast = { type: 'success' | 'error'; message: string } | null;

export default function AdminSales() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState<number | ''>('');
  const [toast, setToast] = useState<Toast>(null);
  const [loading, setLoading] = useState(true);
  const [activeReceipt, setActiveReceipt] = useState<Sale | null>(null);

  // Recharger les données
  const loadData = () => {
    Promise.all([getProducts(), getSales()]).then(([prods, sls]) => {
      setProducts(prods);
      setSales(sls);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Mettre à jour le prix par défaut du produit sélectionné
  useEffect(() => {
    if (selectedProduct) {
      setCustomPrice(selectedProduct.price);
    } else {
      setCustomPrice('');
    }
  }, [selectedProductId, selectedProduct]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSell = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedProductId) return;

    if (quantity > selectedProduct.stock_quantity) {
      showToast('error', 'Quantité supérieure au stock disponible !');
      return;
    }

    const priceToUse = customPrice === '' ? selectedProduct.price : customPrice;
    const total = priceToUse * quantity;

    try {
      const sale = await saveSale({
        product_id: selectedProductId,
        product_name: selectedProduct.name,
        quantity,
        price: priceToUse,
        total
      });

      showToast('success', 'Vente enregistrée et stock mis à jour ✓');
      setActiveReceipt(sale);
      loadData(); // Recharger les stocks et les ventes

      // Réinitialiser le formulaire
      setSelectedProductId('');
      setQuantity(1);
      setCustomPrice('');
    } catch (err) {
      showToast('error', 'Erreur lors de la vente.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
        <p className="font-bold text-sm">Chargement du module de ventes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 print:p-0">
      
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm ${
            toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          } print:hidden`}
        >
          <Icon name="CheckCircleIcon" size={20} />
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h2 className="font-extrabold text-2xl text-foreground">Ventes & Reçus</h2>
          <p className="text-sm text-muted-foreground">Enregistrer des ventes en direct et imprimer des reçus</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start print:grid-cols-1">
        
        {/* Formulaire de Vente */}
        <div className="bg-white rounded-3xl border border-border p-6 md:p-8 space-y-6 shadow-sm print:hidden lg:col-span-2">
          <h3 className="font-extrabold text-lg text-foreground">Nouvelle Vente</h3>
          
          <form onSubmit={handleSell} className="space-y-4">
            
            {/* Sélectionner le produit */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-accent">Produit *</label>
              <select
                required
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              >
                <option value="">Sélectionner un produit</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id} disabled={p.stock_quantity === 0}>
                    {p.name} ({p.stock_quantity} en stock) — {p.price.toLocaleString('fr-CM')} FCFA
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="bg-sky-light rounded-2xl p-4 border border-primary/10 flex items-center justify-between">
                <span className="text-xs font-bold text-accent">Stock restant :</span>
                <span className={`text-sm font-extrabold ${selectedProduct.stock_quantity < 3 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                  {selectedProduct.stock_quantity} disponible(s)
                </span>
              </div>
            )}

            {/* Quantité & Prix unitaire de vente */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-accent">Quantité *</label>
                <input
                  required
                  type="number"
                  min={1}
                  max={selectedProduct ? selectedProduct.stock_quantity : 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-accent">Prix unitaire (FCFA) *</label>
                <input
                  required
                  type="number"
                  min={0}
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full px-4 py-3.5 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>

            </div>

            {selectedProduct && (
              <div className="pt-2 text-right">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Total de la transaction</p>
                <p className="text-2xl font-black text-primary mt-1">
                  {((customPrice || 0) * quantity).toLocaleString('fr-CM')} FCFA
                </p>
              </div>
            )}

            <button
              disabled={!selectedProductId}
              type="submit"
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                !selectedProductId
                  ? 'bg-primary/50 cursor-not-allowed'
                  : 'bg-primary hover:bg-sky-600 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              Enregistrer la Vente
            </button>

          </form>
        </div>

        {/* Aperçu du Reçu */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col justify-between h-full print:border-none print:shadow-none print:p-0">
          
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-foreground print:hidden">Aperçu du Reçu</h3>
            
            {activeReceipt ? (
              <div id="receipt-print-area" className="border border-border rounded-2xl p-6 bg-slate-50 space-y-6 text-accent font-sans print:bg-white print:border-none print:p-0">
                {/* En-tête Reçu */}
                <div className="text-center pb-4 border-b border-dashed border-gray-300">
                  <h4 className="font-black text-lg tracking-wider uppercase">Ultra Tech Multiservice</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Boutique N30, Galeries du Congo, Akwa, Douala</p>
                  <p className="text-[10px] text-gray-500">Tél: +237 676 886 733 / 657 941 527</p>
                </div>

                {/* Détails Facture */}
                <div className="space-y-1.5 text-xs">
                  <p className="flex justify-between">
                    <span className="font-bold text-gray-500">Reçu ID:</span>
                    <span className="font-mono font-extrabold uppercase">{activeReceipt.id}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-bold text-gray-500">Date:</span>
                    <span>{new Date(activeReceipt.created_at).toLocaleString('fr-FR')}</span>
                  </p>
                </div>

                {/* Article */}
                <div className="border-t border-b border-dashed border-gray-300 py-3 space-y-2 text-xs">
                  <div className="flex justify-between font-bold">
                    <span>Article</span>
                    <span>Total</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="max-w-[70%] truncate">
                      {activeReceipt.product_name} <br />
                      <span className="text-[10px] text-gray-400 font-bold">
                        {activeReceipt.quantity} x {activeReceipt.price.toLocaleString('fr-CM')} FCFA
                      </span>
                    </span>
                    <span className="font-extrabold">
                      {activeReceipt.total.toLocaleString('fr-CM')} FCFA
                    </span>
                  </div>
                </div>

                {/* Total Final */}
                <div className="flex justify-between items-center text-sm font-black pt-2 uppercase">
                  <span>Net à payer</span>
                  <span className="text-primary text-base">
                    {activeReceipt.total.toLocaleString('fr-CM')} FCFA
                  </span>
                </div>

                {/* Pied de page du reçu */}
                <div className="text-center pt-4 border-t border-dashed border-gray-300 space-y-1">
                  <p className="text-[10px] font-bold">Merci pour votre confiance !</p>
                  <p className="text-[9px] text-gray-400">Les marchandises vendues ne sont ni reprises ni échangées.</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-2xl print:hidden">
                <Icon name="FileTextIcon" size={36} className="mx-auto opacity-35 mb-2" />
                <p className="text-xs">Aucune vente sélectionnée pour le reçu</p>
              </div>
            )}
          </div>

          {activeReceipt && (
            <div className="mt-6 flex gap-3 print:hidden">
              <button
                onClick={() => setActiveReceipt(null)}
                className="flex-1 py-3 border border-border text-center rounded-2xl font-bold text-xs hover:bg-muted text-accent transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-primary text-white text-center rounded-2xl font-bold text-xs hover:bg-sky-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="PrinterIcon" size={14} />
                Imprimer
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Historique des Ventes */}
      <div className="bg-white rounded-3xl border border-border p-6 md:p-8 space-y-6 shadow-sm print:hidden">
        <h3 className="font-extrabold text-lg text-foreground">Historique des Ventes</h3>
        
        {sales.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-bold text-sm">Aucune vente enregistrée pour le moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground uppercase font-bold">
                  <th className="py-3 px-2">ID</th>
                  <th className="py-3 px-2">Produit</th>
                  <th className="py-3 px-2 text-center">Quantité</th>
                  <th className="py-3 px-2 text-right">Prix Unitaire</th>
                  <th className="py-3 px-2 text-right">Total</th>
                  <th className="py-3 px-2 text-center">Date</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-2 font-mono text-xs uppercase font-extrabold">{sale.id}</td>
                    <td className="py-3 px-2 font-bold">{sale.product_name}</td>
                    <td className="py-3 px-2 text-center font-bold">{sale.quantity}</td>
                    <td className="py-3 px-2 text-right font-extrabold">{sale.price.toLocaleString('fr-CM')} FCFA</td>
                    <td className="py-3 px-2 text-right font-black text-primary">{sale.total.toLocaleString('fr-CM')} FCFA</td>
                    <td className="py-3 px-2 text-center text-xs text-muted-foreground">
                      {new Date(sale.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => setActiveReceipt(sale)}
                        className="p-2 border border-border rounded-xl text-primary hover:bg-sky-light transition-colors"
                        title="Voir le reçu"
                      >
                        <Icon name="FileTextIcon" size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Impression CSS cachée */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-print-area, #receipt-print-area * {
            visibility: visible;
          }
          #receipt-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
