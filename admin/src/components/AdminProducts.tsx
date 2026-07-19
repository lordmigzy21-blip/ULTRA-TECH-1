'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { Product as AdminProduct, getProducts, saveProduct, deleteProduct } from '@/lib/db';

const categories = ['Ordinateurs', 'Téléphones', 'Périphériques', 'Accessoires'];

const emptyForm: Omit<AdminProduct, 'id'> = {
    name: '',
    category: 'Ordinateurs',
    price: 0,
    stock_quantity: 0,
    description: '',
    image_url: '',
    featured: false,
};

type Toast = { type: 'success' | 'error'; message: string } | null;

export default function AdminProducts() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Omit<AdminProduct, 'id'>>(emptyForm);
    const [toast, setToast] = useState<Toast>(null);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                const updated = await saveProduct({ ...form, id: editingId });
                setProducts((prev) =>
                    prev.map((p) => (p.id === editingId ? updated : p))
                );
                showToast('success', 'Produit modifié avec succès ✓');
            } else {
                const added = await saveProduct(form);
                setProducts((prev) => [added, ...prev]);
                showToast('success', 'Produit ajouté avec succès ✓');
            }
            setShowForm(false);
            setEditingId(null);
            setForm(emptyForm);
        } catch (err) {
            showToast('error', 'Erreur de sauvegarde.');
        }
    };

    const handleEdit = (product: AdminProduct) => {
        const { id, ...rest } = product;
        setForm(rest);
        setEditingId(id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Supprimer ce produit ?')) {
            try {
                await deleteProduct(id);
                setProducts((prev) => prev.filter((p) => p.id !== id));
                showToast('success', 'Produit supprimé.');
            } catch (err) {
                showToast('error', 'Erreur de suppression.');
            }
        }
    };

    const handleStockChange = async (id: string, delta: number) => {
        const prod = products.find((p) => p.id === id);
        if (!prod) return;
        const newStock = Math.max(0, prod.stock_quantity + delta);
        try {
            const updated = await saveProduct({ ...prod, stock_quantity: newStock });
            setProducts((prev) =>
                prev.map((p) => (p.id === id ? updated : p))
            );
        } catch (err) {
            showToast('error', 'Erreur de mise à jour du stock.');
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center text-muted-foreground">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
                <p className="font-bold text-sm">Chargement des produits...</p>
            </div>
        );
    }


    return (
        <div className="space-y-6">
            {/* Toast */}
            {toast && (
                <div
                    className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm transition-all ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                >
                    <Icon name={toast.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'} size={20} />
                    {toast.message}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-extrabold text-2xl text-foreground">Produits</h2>
                    <p className="text-sm text-muted-foreground">{products.length} produits au catalogue</p>
                </div>
                <button
                    onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
                    className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-sm hover:bg-dark-blue-2 transition-all hover:scale-105"
                >
                    <Icon name="PlusIcon" size={18} />
                    Ajouter un produit
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-40 bg-black/50 flex items-start justify-center pt-8 px-4 pb-8 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-extrabold text-xl text-foreground">
                                {editingId ? 'Modifier le produit' : 'Nouveau produit'}
                            </h3>
                            <button
                                onClick={() => { setShowForm(false); setEditingId(null); }}
                                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
                            >
                                <Icon name="XMarkIcon" size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-foreground">Nom du produit *</label>
                                <input
                                    required
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    placeholder="Ex: Laptop HP ProBook 450"
                                />
                            </div>

                            {/* Category + Price */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-foreground">Catégorie *</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    >
                                        {categories.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-foreground">Prix (FCFA) *</label>
                                    <input
                                        required
                                        type="number"
                                        min={0}
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                                        className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    />
                                </div>
                            </div>

                            {/* Stock */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-foreground">Quantité en stock *</label>
                                <input
                                    required
                                    type="number"
                                    min={0}
                                    value={form.stock_quantity}
                                    onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-foreground">Description</label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                                    placeholder="Spécifications, caractéristiques..."
                                />
                            </div>

                            {/* Image URL */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-foreground">URL de l&apos;image</label>
                                <input
                                    type="text"
                                    value={form.image_url}
                                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                                    placeholder="https://... ou chemin local"
                                />
                            </div>

                            {/* Featured toggle */}
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div
                                    onClick={() => setForm({ ...form, featured: !form.featured })}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${form.featured ? 'bg-primary' : 'bg-border'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-7' : 'translate-x-1'
                                            }`}
                                    />
                                </div>
                                <span className="text-sm font-bold text-foreground">Afficher en page d&apos;accueil</span>
                            </label>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => { setShowForm(false); setEditingId(null); }}
                                    className="flex-1 py-3.5 rounded-2xl border border-border font-bold text-sm hover:bg-muted transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:bg-dark-blue-2 transition-all"
                                >
                                    {editingId ? 'Enregistrer' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products List */}
            <div className="space-y-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-3xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
                    >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-2xl bg-muted flex-shrink-0 overflow-hidden">
                            <AppImage
                                src={product.image_url}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-contain p-1"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 flex-wrap">
                                <p className="font-bold text-sm text-foreground line-clamp-1">{product.name}</p>
                                {product.featured && (
                                    <span className="text-xs bg-sky-light text-accent px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                                        Vedette
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                            <p className="font-extrabold text-sm text-primary mt-1">
                                {product.price.toLocaleString('fr-CM')} FCFA
                            </p>
                        </div>

                        {/* Stock adjust */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={() => handleStockChange(product.id, -1)}
                                className="w-8 h-8 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors font-bold text-lg"
                            >
                                −
                            </button>
                            <span
                                className={`w-10 text-center font-extrabold text-sm ${product.stock_quantity === 0 ? 'text-red-500' : 'text-foreground'
                                    }`}
                            >
                                {product.stock_quantity}
                            </span>
                            <button
                                onClick={() => handleStockChange(product.id, 1)}
                                className="w-8 h-8 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors font-bold text-lg"
                            >
                                +
                            </button>
                        </div>

                        {/* Stock label */}
                        <span
                            className={`hidden sm:block text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${product.stock_quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                                }`}
                        >
                            {product.stock_quantity > 0 ? 'Disponible' : 'Rupture'}
                        </span>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={() => handleEdit(product)}
                                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
                                title="Modifier"
                            >
                                <Icon name="PencilIcon" size={15} />
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="w-9 h-9 rounded-xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors"
                                title="Supprimer"
                            >
                                <Icon name="TrashIcon" size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}