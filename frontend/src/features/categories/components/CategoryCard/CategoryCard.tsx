import { FolderOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { CategoryStatusBadge } from '../CategoryStatusBadge/CategoryStatusBadge'
import type { Category } from '../../types/Category'
import { getDocumentCountLabel } from '../../utils/categoryFormatter'

interface CategoryCardProps {
  category: Category
  onClick?: (category: Category) => void
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div
      className="cat-card"
      onClick={() => onClick?.(category)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(category)}
      id={`category-card-${category.id}`}
    >
      <div className="cat-card__header">
        <div className="cat-card__icon">
          <FolderOutlined />
        </div>
        <CategoryStatusBadge status={category.status} />
      </div>
      <div className="cat-card__body">
        <h4 className="cat-card__name">{category.name}</h4>
        {category.description && (
          <p className="cat-card__desc">
            {category.description.length > 80
              ? `${category.description.slice(0, 80)}…`
              : category.description}
          </p>
        )}
      </div>
      <div className="cat-card__footer">
        <span className="cat-card__count">{getDocumentCountLabel(category.documentCount)}</span>
        {category.parentName && (
          <span className="cat-card__parent">↳ {category.parentName}</span>
        )}
        <ArrowRightOutlined className="cat-card__arrow" />
      </div>
    </div>
  )
}
